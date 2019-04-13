import {Event, EventChain} from 'lto-api';
import LtoModel from '../lib/lto-model-helper';

class ChainModel extends LtoModel {

  async loadChain(chainId) {
    const path = `/api/events/event-chains/${chainId}`;
    const method = 'get';
    const chain = new EventChain();
    const chainData = await this.sendRequest({path, method});
    console.log(chainData);
    const chainDataVals = chain.setValues(chainData);
    console.log(chainDataVals);
    return chainDataVals;
  }

}

module.exports = ChainModel;