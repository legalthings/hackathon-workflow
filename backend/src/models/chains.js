import LtoModel from '../lib/lto-model-helper';

class ChainModel extends LtoModel {

  getEventData(event){
    let body = ChainModel.unpackBase58Event(event.body);
    return {
      id: body.id,
      info: body.info
    }
  }

  async getChainData(chainId){
    const path = `/api/events/event-chains/${chainId}`;
    const method = 'get';
    const chainData = await this.sendRequest({path, method});
    return chainData;
  }

  async loadChain(chainId) {
    const chainData = await this.getChainData(chainId);
    let response = {
      id: chainData.id,
      events: [],
      identities: []
    };
    chainData.events.forEach(event => {
      response.events.push(this.getEventData(event))
    });
    return response;
  }

}

module.exports = ChainModel;
