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

  async sendRequest( path, method, data) {
    const headers = this.getRequestHeaders(path, method);

    const requestOptions = {
      method,
      url: this.url + path,
      headers,
      json: true
    };

    if (data) {
      requestOptions.json = data;
    }

    const resp = await request(requestOptions);
    return resp;
  }

}

module.exports = LtoModel;