import {LTO, HTTPSignature, Request} from 'lto-api';
import request from 'request-promise';
import bs58 from 'bs58'

class LtoModel {

  constructor() {
    this.url = process.env.LTO_NODE_URL || 'http://localhost:3000';
    this.seed = process.env.LTO_SEED || 'some test seed for development that is long enough';
    this.lto = new LTO();
    this.account = this.createAccount(this.seed)
  }

  createAccount(seed) {
    return this.lto.createAccountFromExistingPhrase(seed);
  }

  getRequestHeaders(path, method) {
    const date = (new Date()).toUTCString();

    const headers = {
      'date': date
    };

    const req = new Request(path, method, headers);

    const signature = new HTTPSignature(req, ['(request-target)', 'date']);
    headers.authorization = `Signature ${signature.signWith(this.account)}`;
    return headers;
  }


  static unpackBase58Event(base58EventData){
    return JSON.parse(bs58.decode(base58EventData).toString());
  }

  /**
   * Make a request to the LTO node
   *  conf: {path, method, data}
   */
  async sendRequest(conf) {
    const headers = this.getRequestHeaders(conf.path, conf.method);

    const requestOptions = {
      method: conf.method,
      url: this.url + conf.path,
      headers,
      json: true
    };

    if (conf.data) {
      requestOptions.json = conf.data;
    }

    const resp = await request(requestOptions);
    return resp;
  }

}

module.exports = LtoModel;