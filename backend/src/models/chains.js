import {LTO, Event, EventChain, HTTPSignature, Request} from 'lto-api';
import request from 'request-promise';

class ChainModel {

  constructor(url, seed) {
    // this.url = 'https://ilt.legalthings.one';
    this.url = url || 'http://localhost:3000';
    this.seed = seed || 'some test seed';
    this.lto = new LTO();
    this.account = this.createAccount(this.seed)
  }

  createAccount(seed) {
    return this.lto.createAccountFromExistingPhrase(seed);
  }

  async sendRequest( path, method, data, qs, strategy) {
    const date = (new Date()).toUTCString();

    const headers = {
      'date': date
    };

    const req = new Request(path, method, headers);

    const signature = new HTTPSignature(req, ['(request-target)', 'date']);
    headers.authorization = `Signature ${signature.signWith(this.account)}`;

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
      requestOptions.qs = qs;
    }

    const resp = await request(requestOptions);
    return resp;
  }


  async loadChain(chainId) {
    // To load the chain we will need to generate the chain id based on the ilt account key and the licenseId
    // const chainId = this.lto.createEventChainId(this.account.getPublicSignKey(), chainId);

    const path = `/api/events/event-chains/${chainId}`;
    const method = 'get';

    const chain = new EventChain();
    const chainData = await this.sendRequest(this.account, path, method);
    console.log(chainData);
    const chainDataVals = chain.setValues(chainData);
    console.log(chainDataVals);
    return chainDataVals;
  }


}

module.exports = ILTHelper;