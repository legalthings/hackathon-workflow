import bs58 from 'bs58';
import LtoModel from '../lib/lto-model-helper';

class ChainModel extends LtoModel {

  async loadChain(chainId) {
    const path = `/api/events/event-chains/${chainId}`;
    const method = 'get';
    const chainData = await this.sendRequest({path, method});
    console.log(chainData);
    let response = {
      id: chainData.id,
      events: []
    };
    chainData.events.forEach(function (event) {
      console.log(event.body);
      let body = JSON.parse(bs58.decode(event.body).toString());
      console.log(body);
      response.events.push({
        id: body.id,
        info: body.info
      })
    });
    return response;
  }

}

module.exports = ChainModel;
