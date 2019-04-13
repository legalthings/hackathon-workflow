import {LTO, HTTPSignature, Request} from 'lto-api';
import request from 'request-promise';

class LtoModel {

  constructor() {
    // this.url = 'https://ilt.legalthings.one';
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

  async sendRequest(conf) {
    // conf: {path, method, data}
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