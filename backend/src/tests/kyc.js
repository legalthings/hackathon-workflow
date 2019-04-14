'use-strict';
const qrcode = require('qrcode-terminal');
const NutrecoHelper = require('./NutrecoHelper');

const accountSeed = 'some third party seed';
const chainSeed = 'some kyc seed';

const node1 = 'http://localhost:3000';

const timeout = ms => new Promise(res => setTimeout(res, ms));

(async() => {
  const nutrecoHelper = new NutrecoHelper(node1);
  const systemKey = await nutrecoHelper.loadSystemKey();
  const nodeAddress = await nutrecoHelper.loadNodeAddress();

  const inspectorAccount = nutrecoHelper.createAccount(accountSeed);
  const inspecteeAccount = nutrecoHelper.createAccount('some inspectee seed');
  const reviewerAccount = nutrecoHelper.createAccount('some reviewer seed');
  const signeeAccount = nutrecoHelper.createAccount('some signee seed');

  const inspectorPublicSignKey = inspectorAccount.getPublicSignKey();
  const process = 'main';
  let nextAction = {};

  console.log('Delete previous chains and processes');
  console.log(await nutrecoHelper.deleteProcess(inspectorAccount, process, chainSeed, inspectorAccount.getPublicSignKey()));
  console.log(await nutrecoHelper.deleteEventChain(inspectorAccount, chainSeed));

  actorData = {
    inspectee: {
      name: 'Inspectee',
      public_key: inspecteeAccount.getPublicSignKey(),
      systenKey: systemKey,
      node: nodeAddress
    },
    reviewer: {
      name: 'Reviewer',
      public_key: reviewerAccount.getPublicSignKey(),
      systenKey: systemKey,
      node: nodeAddress
    },
    signee: {
      name: 'Signee',
      public_key: signeeAccount.getPublicSignKey(),
      systenKey: systemKey,
      node: nodeAddress
    }
  };

  let chain = await nutrecoHelper.createKYCChain(inspectorAccount, chainSeed, systemKey, actorData, nodeAddress);
  let res = await nutrecoHelper.sendChain(inspectorAccount, chain);
  await timeout(500);

  nextAction = {
    key: "invite_actors",
    actor: {
      key: 'inspector',
      id: inspectorAccount.id
    },
    response: {
      key: "ok"
    },
    data: {}
  };

  console.info("Event added");
  
  chain = await nutrecoHelper.loadChain(inspectorAccount, chainSeed, inspectorAccount.getPublicSignKey());
  chain = await nutrecoHelper.performDataAction(chain, inspectorAccount, process, nextAction);
  res = await nutrecoHelper.sendChain(inspectorAccount, chain);
  await timeout(500);

  nextAction = {
    key: "store_inspector_data",
    actor: {
      key: 'inspector',
      id: inspectorAccount.id
    },
    response: {
      key: "ok"
    },
    data: {
      pictures: "all kinds of images"
    }
  };

  console.info("Event added");
  
  chain = await nutrecoHelper.loadChain(inspectorAccount, chainSeed, inspectorAccount.getPublicSignKey());
  chain = await nutrecoHelper.performDataAction(chain, inspectorAccount, process, nextAction);
  res = await nutrecoHelper.sendChain(inspectorAccount, chain);
  await timeout(500);

  nextAction = {
    key: "review_inspector_data",
    actor: {
      key: 'reviewer',
      id: reviewerAccount.id
    },
    response: {
      key: "ok"
    },
    data: {}
  };

  console.info("Event added");
  
  chain = await nutrecoHelper.loadChain(inspectorAccount, chainSeed, inspectorAccount.getPublicSignKey());
  chain = await nutrecoHelper.performDataAction(chain, inspectorAccount, process, nextAction);
  res = await nutrecoHelper.sendChain(inspectorAccount, chain);
  await timeout(500);
})();

