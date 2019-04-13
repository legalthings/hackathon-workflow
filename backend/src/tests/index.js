'use-strict';
const qrcode = require('qrcode-terminal');
const NutrecoHelper = require('./NutrecoHelper');

const accountSeed = 'some nutreco seed';
const chainSeed = 'some eventchain seed';

const node1 = 'http://localhost:3000';

(async() => {
  const nutrecoHelper = new NutrecoHelper(node1);
  const systemKey = await nutrecoHelper.loadSystemKey();
  const nodeAddress = await nutrecoHelper.loadNodeAddress();

  const nutrecoAccount = nutrecoHelper.createAccount(accountSeed);
  const eggChickenAccount = nutrecoHelper.createAccount('some egg chicken seed');
  const hatcherAccount = nutrecoHelper.createAccount('some hatcher seed');
  const eatChickenAccount = nutrecoHelper.createAccount('some eat chicken seed');
  const slaughterhouseAccount = nutrecoHelper.createAccount('some slaughterhouse seed');
  const supermarketAccount = nutrecoHelper.createAccount('some supermarket seed');
  const foodTransporter1Account = nutrecoHelper.createAccount('some food transporter 1 seed');
  const foodTransporter2Account = nutrecoHelper.createAccount('some food transporter 2 seed');
  const eggTransporterAccount = nutrecoHelper.createAccount('some egg transporter seed');
  const chickenTransporter1Account = nutrecoHelper.createAccount('some chicken transporter 1 seed');
  const chickenTransporter2Account = nutrecoHelper.createAccount('some chicken transporter 2 seed');
  const meatTransporter1Account = nutrecoHelper.createAccount('some meat transporter 1 seed');
  const meatTransporter2Account = nutrecoHelper.createAccount('some meat transporter 2 seed');

  const nutrecoPublicSignKey = nutrecoAccount.getPublicSignKey();
  const process = 'main';

  console.log('Delete previous chains and processes');
  console.log(await nutrecoHelper.deleteProcess(nutrecoAccount, process, chainSeed, nutrecoAccount.getPublicSignKey()));
  console.log(await nutrecoHelper.deleteEventChain(nutrecoAccount, chainSeed));

  actorData = {
    egg_chickens: {
      name: 'Egg Chickens',
      public_key: eggChickenAccount.getPublicSignKey(),
      systenKey: systemKey,
      node: nodeAddress
    },
    hatcher: {
      name: 'Hatcher',
      public_key: hatcherAccount.getPublicSignKey(),
      systenKey: systemKey,
      node: nodeAddress
    },
    eat_chickens: {
      name: 'Eat chickens',
      public_key: eatChickenAccount.getPublicSignKey(),
      systenKey: systemKey,
      node: nodeAddress
    },
    slaughterhouse: {
      name: 'Slaughterhouse',
      public_key: slaughterhouseAccount.getPublicSignKey(),
      systenKey: systemKey,
      node: nodeAddress
    },
    supermarket: {
      name: 'Supermarket',
      public_key: supermarketAccount.getPublicSignKey(),
      systenKey: systemKey,
      node: nodeAddress
    },
    food_transporter_1: {
      name: 'Food transporter 1',
      public_key: foodTransporter1Account.getPublicSignKey(),
      systenKey: systemKey,
      node: nodeAddress
    },
    food_transporter_2: {
      name: 'Food transporter 2',
      public_key: foodTransporter2Account.getPublicSignKey(),
      systenKey: systemKey,
      node: nodeAddress
    },
    egg_transporter: {
      name: 'Egg transporter',
      public_key: eggTransporterAccount.getPublicSignKey(),
      systenKey: systemKey,
      node: nodeAddress
    },
    chicken_transporter_1: {
      name: 'Chicken transporter 1',
      public_key: chickenTransporter1Account.getPublicSignKey(),
      systenKey: systemKey,
      node: nodeAddress
    },
    chicken_transporter_2: {
      name: 'Chicken transporter 2',
      public_key: chickenTransporter2Account.getPublicSignKey(),
      systenKey: systemKey,
      node: nodeAddress
    },
    meat_transporter_1: {
      name: 'Meat transporter 1',
      public_key: meatTransporter1Account.getPublicSignKey(),
      systenKey: systemKey,
      node: nodeAddress
    },
    meat_transporter_2: {
      name: 'Meat transporter 2',
      public_key: meatTransporter2Account.getPublicSignKey(),
      systenKey: systemKey,
      node: nodeAddress
    }
  };

  let chain = await nutrecoHelper.createSupplyChain(nutrecoAccount, chainSeed, systemKey, actorData, nodeAddress);
  console.log(chain.id)
  let res = await nutrecoHelper.sendChain(nutrecoAccount, chain);

  console.log(res);

  let action = {
    key: "invite_actors",
    actor: {
      key: 'nutreco',
      id: nutrecoAccount.id
    },
    response: {
      key: "ok"
    },
    data: {}
  };
  
  chain = await nutrecoHelper.loadChain(nutrecoAccount, chainSeed, nutrecoAccount.getPublicSignKey());
  chain = await nutrecoHelper.performDataAction(chain, nutrecoAccount, process, action);
  process_full = nutrecoHelper.loadProcess(nutrecoAccount, chainSeed, process, nutrecoAccount.getPublicSignKey());
  console.log(process_full);
  res = await nutrecoHelper.sendChain(nutrecoAccount, chain);

  console.log(res);



  let appUrl = `https://ddfb878d.ngrok.io/chain/${chain.id}/`;
  console.info(`Scan the QR to go to the app url: ${appUrl}`)
  qrcode.generate(appUrl, {small: true});
  // console.log(res);
  //await(timeout(500));
})();
