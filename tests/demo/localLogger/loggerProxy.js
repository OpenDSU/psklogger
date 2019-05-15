const Configurator = require('../../../src/utils/Configurator');
const PubSubProxy = require('../../../src/PubSubProxy');

const config = Configurator.getConfig();

const proxy = new PubSubProxy(config);
