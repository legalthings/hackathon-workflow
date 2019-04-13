require('babel-polyfill');
const LTO = require('lto-api').LTO;
const Event = require('lto-api').Event;
const EventChain = require('lto-api').EventChain;
const HTTPSignature = require('lto-api').HTTPSignature;
const Request = require('lto-api').Request;
const request = require('request-promise');
const UUID = require('node-uuid');

const RETRY_RATE = 100

class NutrecoHelper {
  
  constructor(url) {
    this.url = url || 'http://localhost:3000';
    this.lto = new LTO;
    this.activeState = null;
  }

  createAccount(seed) {
    return this.lto.createAccountFromExistingPhrase(seed);
  }

  async loadSystemKey() {
    const systemInfo = await request({url: this.url, json: true});
    return systemInfo.services.events.signkey;
  }

  async loadNodeAddress() {
    const systemInfo = await request({url: this.url, json: true});
    return systemInfo.services.queuer.node;
  }

  addIdentity(account, name, nutrecoAccount, chain) {
    const event = this.createIdentity(account, name);
    event.addTo(chain).signWith(nutrecoAccount);

    return chain;
  }

  createIdentity(account, name, signkey, nodeAddress) {
    account.id = UUID.v4();

    return new Event({
      $schema: "https://specs.livecontracts.io/v0.1.0/identity/schema.json#",
      id: account.id,
      info: {
        name
      },
      node: nodeAddress,
      signkeys: {
        user: account.getPublicSignKey(),
        system: signkey,
      },
      encryptkey: account.getPublicEncryptKey()
    });
  }

  deleteEventChain(account, seed, publicKey) {
    if (!publicKey) {
      publicKey = account.getPublicSignKey();
    }

    const chainId = this.lto.createEventChainId(publicKey, seed);
    const path = `/api/events/event-chains/${chainId}`;
    const method = 'delete';
    
    return this.sendRequest(account, path, method);
  }

  deleteProcess(account, process, seed, nutrecoPublicKey) {
    const chainId = this.lto.createEventChainId(nutrecoPublicKey, seed);
    const chain = new EventChain(chainId);
    const processId = chain.createProjectionId(process);

    const path = `/api/flow/processes/${processId}`;
    const method = 'delete';

    return this.sendRequest(account, path, method);
  }

  sendChain(account, chain) {
    const path = '/api/events/queue';
    const method = 'post';

    return this.sendRequest(account, path, method, chain);
  }

  async sendRequest(account, path, method, data, qs, strategy) {
    const date = (new Date()).toUTCString();

    const headers = {
      'date': date
    };

    const req = new Request(path, method, headers);
    const signature = new HTTPSignature(req, ['(request-target)', 'date']);
    headers.authorization = `Signature ${signature.signWith(account)}`;

    const requestOptions = {
      method,
      url: this.url + path,
      headers,
      json: true
    };

    if (data) {
      requestOptions.json = data;
    }

    if (qs) {
      requestOption.qs = qs;
    }

    const resp = await request(requestOptions);
    return resp;
  }

  myProcessRetryStrategy(err, response, body) {
    if (body && body.current && this.activeState && body.current.key != this.activeState) {
      return true;
    }

    return err || response.statusCode == 502;
  }

  async createSupplyChain(account, seed, signkey, actorInfo, nodeAddress) {
    const chain = account.createEventChain(seed);
    const identityEvent = this.createIdentity(account, 'Nutreco', signkey, nodeAddress);
    identityEvent.addTo(chain).signWith(account);
    await this.sendChain(account, chain);


    const scenario = require('../../../scenarios/supply_chain.json');
    const scenarioEvent = new Event(scenario);
    scenarioEvent.addTo(chain).signWith(account);
    await this.sendChain(account, chain);

    const key = scenario.actions['start'].default_response || 'ok';

    const processId = chain.createProjectionId('main');
    const response = {
      '$schema': 'https://specs.livecontracts.io/v0.1.0/response/schema.json#',
      process: {
        id: `lt:/processes/${processId}`,
        scenario: {
          id: scenario.id + `?v=${scenarioEvent.getResourceVersion()}`,
        }
      },
      action: {
        key: 'start'
      },
      actor: {
        key: 'nutreco',
        id: account.id
      },
      key,
      data: actorInfo
    };

    const inviteActorsEvent = new Event(response);
    inviteActorsEvent.addTo(chain).signWith(account);
    return chain;
  }

  async loadChain(account, seed, nutrecoPublicKey) {
    const chainId = this.lto.createEventChainId(nutrecoPublicKey, seed);

    const path = `/api/events/event-chains/${chainId}`;
    const method = 'get';
    const chain = new EventChain();
    const chainData = await this.sendRequest(account, path, method);

    return chain.setValues(chainData);
  }

  loadProcess(account, seed, process, nutrecoPublicKey) {
    const chainId = this.lto.createEventChainId(nutrecoPublicKey, seed);
    const chain = new EventChain();
    console.log(process);
    const processId = chain.createProjectionId(process);
    console.log(processId);
    
    const path = `/api/flow/processes/${processId}`;
    const method = 'get';
    
    return this.sendRequest(account, path, method);
  }

  performDataAction(chain, account, process, action) {
    const processId = chain.createProjectionId(process);
    const response = {
      '$schema': 'https://specs.livecontracts.io/v0.1.0/response/schema.json#',
      process: {
        id: `lt:/processes/${processId}`
      },
      action: {
        key: action.key
      },
      actor: {
        key: action.actor.key,
        id: action.actor.id
      },
      key: action.response.key,
      data: action.data
    };

    const event = new Event(response);
    event.addTo(chain).signWith(account);
    return chain;
  }
}

module.exports = NutrecoHelper;
