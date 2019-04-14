'use-strict';
const colors = require('colors');
const figlet = require('figlet');
const qrcode = require('qrcode-terminal');
const NutrecoHelper = require('./NutrecoHelper');

const accountSeed = 'some nutreco seed';
const chainSeed = 'some eventchain seed';

const node1 = 'http://localhost:3000';

const timeout = ms => new Promise(res => setTimeout(res, ms));

(async() => {

  figlet.text('FoodFlow!', {
    font: 'Ghost',
    horizontalLayout: 'default',
    verticalLayout: 'default'
  }, function(err, data) {
    if (err) {
      console.log('Something went wrong...');
      console.dir(err);
      return;
    }
    console.log(data);
  });

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
  let nextAction = {};

  //console.log('Delete previous chains and processes');
  await nutrecoHelper.deleteProcess(nutrecoAccount, process, chainSeed, nutrecoAccount.getPublicSignKey());
  await nutrecoHelper.deleteEventChain(nutrecoAccount, chainSeed);

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

  console.info('Farm audited, process started'.cyan);

  let chain = await nutrecoHelper.createSupplyChain(nutrecoAccount, chainSeed, systemKey, actorData, nodeAddress);
  let res = await nutrecoHelper.sendChain(nutrecoAccount, chain);
  await timeout(500);

  nextAction = {
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

  console.log("Invite parties to participate in the process.".cyan);
  
  chain = await nutrecoHelper.loadChain(nutrecoAccount, chainSeed, nutrecoAccount.getPublicSignKey());
  chain = await nutrecoHelper.performDataAction(chain, nutrecoAccount, process, nextAction);
  res = await nutrecoHelper.sendChain(nutrecoAccount, chain);
  await timeout(500);

  nextAction = {
    key: "add_food_data",
    actor: {
      key: 'nutreco',
      id: nutrecoAccount.id
    },
    response: {
      key: "ok"
    },
    data: {
      taste: "delicious"
    }
  };
  
  console.info("Food supplier provides data about the food.".red);
  
  chain = await nutrecoHelper.loadChain(nutrecoAccount, chainSeed, nutrecoAccount.getPublicSignKey());
  chain = await nutrecoHelper.performDataAction(chain, nutrecoAccount, process, nextAction);
  res = await nutrecoHelper.sendChain(nutrecoAccount, chain);
  await timeout(500);

  nextAction = {
    key: "food_transport_1_leaving",
    actor: {
      key: 'food_transporter_1',
      id: foodTransporter1Account.id
    },
    response: {
      key: "ok"
    },
    data: {}
  };
  
  console.info("Food left for the chicken coop.".yellow);
  
  chain = await nutrecoHelper.loadChain(nutrecoAccount, chainSeed, nutrecoAccount.getPublicSignKey());
  chain = await nutrecoHelper.performDataAction(chain, nutrecoAccount, process, nextAction);
  res = await nutrecoHelper.sendChain(nutrecoAccount, chain);
  await timeout(500);

  nextAction = {
    key: "food_transport_1_arriving",
    actor: {
      key: 'food_transporter_1',
      id: foodTransporter1Account.id
    },
    response: {
      key: "ok"
    },
    data: {}
  };
  
  console.info("Food arrived at the chicken coop.".yellow);
  
  chain = await nutrecoHelper.loadChain(nutrecoAccount, chainSeed, nutrecoAccount.getPublicSignKey());
  chain = await nutrecoHelper.performDataAction(chain, nutrecoAccount, process, nextAction);
  res = await nutrecoHelper.sendChain(nutrecoAccount, chain);
  await timeout(500);

  nextAction = {
    key: "lay_eggs",
    actor: {
      key: 'egg_chickens',
      id: eggChickenAccount.id
    },
    response: {
      key: "ok"
    },
    data: {}
  };
  
  console.info("The chickens have layed their eggs.".red);
  
  chain = await nutrecoHelper.loadChain(nutrecoAccount, chainSeed, nutrecoAccount.getPublicSignKey());
  chain = await nutrecoHelper.performDataAction(chain, nutrecoAccount, process, nextAction);
  res = await nutrecoHelper.sendChain(nutrecoAccount, chain);
  await timeout(500);

  nextAction = {
    key: "egg_transport_leaving",
    actor: {
      key: 'egg_transporter',
      id: eggTransporterAccount.id
    },
    response: {
      key: "ok"
    },
    data: {}
  };
  
  console.info("The eggs left for the hachery".yellow);
  
  chain = await nutrecoHelper.loadChain(nutrecoAccount, chainSeed, nutrecoAccount.getPublicSignKey());
  chain = await nutrecoHelper.performDataAction(chain, nutrecoAccount, process, nextAction);
  res = await nutrecoHelper.sendChain(nutrecoAccount, chain);
  await timeout(500);

  nextAction = {
    key: "egg_transport_arriving",
    actor: {
      key: 'egg_transporter',
      id: eggTransporterAccount.id
    },
    response: {
      key: "ok"
    },
    data: {}
  };
  
  console.info("The eggs arrived at the hatchery".yellow);
  
  chain = await nutrecoHelper.loadChain(nutrecoAccount, chainSeed, nutrecoAccount.getPublicSignKey());
  chain = await nutrecoHelper.performDataAction(chain, nutrecoAccount, process, nextAction);
  res = await nutrecoHelper.sendChain(nutrecoAccount, chain);
  await timeout(500);

  nextAction = {
    key: "egg_hatches",
    actor: {
      key: 'hatcher',
      id: hatcherAccount.id
    },
    response: {
      key: "ok"
    },
    data: {}
  };
  
  console.info("The eggs hatched.".red);
  
  chain = await nutrecoHelper.loadChain(nutrecoAccount, chainSeed, nutrecoAccount.getPublicSignKey());
  chain = await nutrecoHelper.performDataAction(chain, nutrecoAccount, process, nextAction);
  res = await nutrecoHelper.sendChain(nutrecoAccount, chain);
  await timeout(500);

  nextAction = {
    key: "food_transport_2_leaving",
    actor: {
      key: 'food_transporter_2',
      id: foodTransporter2Account.id
    },
    response: {
      key: "ok"
    },
    data: {}
  };
  
  console.info("Food left for the chicken coop.".yellow);
  
  chain = await nutrecoHelper.loadChain(nutrecoAccount, chainSeed, nutrecoAccount.getPublicSignKey());
  chain = await nutrecoHelper.performDataAction(chain, nutrecoAccount, process, nextAction);
  res = await nutrecoHelper.sendChain(nutrecoAccount, chain);
  await timeout(500);

  nextAction = {
    key: "food_transport_2_arriving",
    actor: {
      key: 'food_transporter_2',
      id: foodTransporter2Account.id
    },
    response: {
      key: "ok"
    },
    data: {}
  };
  
  console.info("Food arrives at the chicken coop.".yellow);
  
  chain = await nutrecoHelper.loadChain(nutrecoAccount, chainSeed, nutrecoAccount.getPublicSignKey());
  chain = await nutrecoHelper.performDataAction(chain, nutrecoAccount, process, nextAction);
  res = await nutrecoHelper.sendChain(nutrecoAccount, chain);
  await timeout(500);

  nextAction = {
    key: "chick_transport_leaving",
    actor: {
      key: 'chicken_transporter_1',
      id: chickenTransporter1Account.id
    },
    response: {
      key: "ok"
    },
    data: {}
  };
  
  console.info("The chicks left for the chicken coop.".yellow);
  
  chain = await nutrecoHelper.loadChain(nutrecoAccount, chainSeed, nutrecoAccount.getPublicSignKey());
  chain = await nutrecoHelper.performDataAction(chain, nutrecoAccount, process, nextAction);
  res = await nutrecoHelper.sendChain(nutrecoAccount, chain);
  await timeout(500);

  nextAction = {
    key: "chick_transport_arriving",
    actor: {
      key: 'chicken_transporter_1',
      id: chickenTransporter1Account.id
    },
    response: {
      key: "ok"
    },
    data: {}
  };
  
  console.info("The chicks arrived at the chicken coop.".yellow);
  
  chain = await nutrecoHelper.loadChain(nutrecoAccount, chainSeed, nutrecoAccount.getPublicSignKey());
  chain = await nutrecoHelper.performDataAction(chain, nutrecoAccount, process, nextAction);
  res = await nutrecoHelper.sendChain(nutrecoAccount, chain);
  await timeout(500);

  nextAction = {
    key: "feed_chicken",
    actor: {
      key: 'eat_chickens',
      id: eatChickenAccount.id
    },
    response: {
      key: "ok"
    },
    data: {}
  };
  
  console.info("The chickens are being fed.".red);
  
  chain = await nutrecoHelper.loadChain(nutrecoAccount, chainSeed, nutrecoAccount.getPublicSignKey());
  chain = await nutrecoHelper.performDataAction(chain, nutrecoAccount, process, nextAction);
  res = await nutrecoHelper.sendChain(nutrecoAccount, chain);
  await timeout(500);

  nextAction = {
    key: "feed_chicken",
    actor: {
      key: 'eat_chickens',
      id: eatChickenAccount.id
    },
    response: {
      key: "ok"
    },
    data: {}
  };
  
  console.info("The chickens are being fed.".red);
  
  chain = await nutrecoHelper.loadChain(nutrecoAccount, chainSeed, nutrecoAccount.getPublicSignKey());
  chain = await nutrecoHelper.performDataAction(chain, nutrecoAccount, process, nextAction);
  res = await nutrecoHelper.sendChain(nutrecoAccount, chain);
  await timeout(500);

  nextAction = {
    key: "feed_chicken",
    actor: {
      key: 'eat_chickens',
      id: eatChickenAccount.id
    },
    response: {
      key: "ok"
    },
    data: {}
  };
  
  console.info("The chickens are being fed.".red);
  
  chain = await nutrecoHelper.loadChain(nutrecoAccount, chainSeed, nutrecoAccount.getPublicSignKey());
  chain = await nutrecoHelper.performDataAction(chain, nutrecoAccount, process, nextAction);
  res = await nutrecoHelper.sendChain(nutrecoAccount, chain);
  await timeout(500);

  nextAction = {
    key: "chicken_transport_leaving",
    actor: {
      key: 'chicken_transporter_2',
      id: chickenTransporter2Account.id
    },
    response: {
      key: "ok"
    },
    data: {}
  };
  
  console.info("The chickens left for the slaughterhouse.".yellow);
  
  chain = await nutrecoHelper.loadChain(nutrecoAccount, chainSeed, nutrecoAccount.getPublicSignKey());
  chain = await nutrecoHelper.performDataAction(chain, nutrecoAccount, process, nextAction);
  res = await nutrecoHelper.sendChain(nutrecoAccount, chain);
  await timeout(500);

  nextAction = {
    key: "chicken_transport_arriving",
    actor: {
      key: 'chicken_transporter_2',
      id: chickenTransporter2Account.id
    },
    response: {
      key: "ok"
    },
    data: {}
  };
  
  console.info("The chickens arrived at the slaughterhouse.".yellow);
  
  chain = await nutrecoHelper.loadChain(nutrecoAccount, chainSeed, nutrecoAccount.getPublicSignKey());
  chain = await nutrecoHelper.performDataAction(chain, nutrecoAccount, process, nextAction);
  res = await nutrecoHelper.sendChain(nutrecoAccount, chain);
  await timeout(500);

  nextAction = {
    key: "slaughter_chicken",
    actor: {
      key: 'slaughterhouse',
      id: slaughterhouseAccount.id
    },
    response: {
      key: "ok"
    },
    data: {}
  };
  
  console.info("The chickens were slaughtered.".green);
  
  chain = await nutrecoHelper.loadChain(nutrecoAccount, chainSeed, nutrecoAccount.getPublicSignKey());
  chain = await nutrecoHelper.performDataAction(chain, nutrecoAccount, process, nextAction);
  res = await nutrecoHelper.sendChain(nutrecoAccount, chain);
  await timeout(500);

  nextAction = {
    key: "meat_transport_1_leaving",
    actor: {
      key: 'meat_transporter_1',
      id: meatTransporter1Account.id
    },
    response: {
      key: "ok"
    },
    data: {}
  };
  
  console.info("The chicken meat left for the supermarket storage.".yellow);
  
  chain = await nutrecoHelper.loadChain(nutrecoAccount, chainSeed, nutrecoAccount.getPublicSignKey());
  chain = await nutrecoHelper.performDataAction(chain, nutrecoAccount, process, nextAction);
  res = await nutrecoHelper.sendChain(nutrecoAccount, chain);
  await timeout(500);

  nextAction = {
    key: "meat_transport_1_arriving",
    actor: {
      key: 'meat_transporter_1',
      id: meatTransporter1Account.id
    },
    response: {
      key: "ok"
    },
    data: {}
  };
  
  console.info("The chicken meat arrived at the supermarket storage.".yellow);
  
  chain = await nutrecoHelper.loadChain(nutrecoAccount, chainSeed, nutrecoAccount.getPublicSignKey());
  chain = await nutrecoHelper.performDataAction(chain, nutrecoAccount, process, nextAction);
  res = await nutrecoHelper.sendChain(nutrecoAccount, chain);
  await timeout(500);

  nextAction = {
    key: "meat_transport_2_leaving",
    actor: {
      key: 'meat_transporter_2',
      id: meatTransporter2Account.id
    },
    response: {
      key: "ok"
    },
    data: {}
  };
  
  console.info("The chicken meat left for the supermarket.".yellow);
  
  chain = await nutrecoHelper.loadChain(nutrecoAccount, chainSeed, nutrecoAccount.getPublicSignKey());
  chain = await nutrecoHelper.performDataAction(chain, nutrecoAccount, process, nextAction);
  res = await nutrecoHelper.sendChain(nutrecoAccount, chain);
  await timeout(500);

  nextAction = {
    key: "meat_transport_2_arriving",
    actor: {
      key: 'meat_transporter_2',
      id: meatTransporter2Account.id
    },
    response: {
      key: "ok"
    },
    data: {}
  };
  
  console.info("The chicken meat arrived at the supermarket".yellow);
  
  chain = await nutrecoHelper.loadChain(nutrecoAccount, chainSeed, nutrecoAccount.getPublicSignKey());
  chain = await nutrecoHelper.performDataAction(chain, nutrecoAccount, process, nextAction);
  res = await nutrecoHelper.sendChain(nutrecoAccount, chain);
  await timeout(500);

  console.log('\n')

  let appUrl = `https://ddfb878d.ngrok.io/chain/${chain.id}/`;
  let backendUrl = `http://localhost:9000/api/chains/${chain.id}/`;
  console.info(`Backend API url: ${backendUrl}`);
  console.log('');
  console.info('Scan the QR to go to the app url:');
  console.log('');
  console.log(`${appUrl}`.green);
  console.log('');
  qrcode.generate(appUrl, {small: true});
  // console.log(res);
  //await(timeout(500));
})();
