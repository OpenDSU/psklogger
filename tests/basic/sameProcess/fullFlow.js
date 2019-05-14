const PubSubProxy = require('../../../src/PubSubProxy');


/** starting proxy **/
const proxy = new PubSubProxy({pubAddress: 'tcp://127.0.0.1:7000', subAddress: 'tcp://127.0.0.1:7001'});


/** starting collector **/
const LocalCollector = require('../../../src/LocalMessageCollector').LocalMessageCollector;

new LocalCollector('tcp://127.0.0.1:7001', (topic, message) => {
    console.log('log level', topic.toString(), 'message:', message.toString());
});

/** starting logger **/
const LoggerClient = require('../../../src/LoggerClient').LoggerClient;
const TransportClient = require('../../../src/MessageCollectorClient').TransportClient;
const transport = new TransportClient('tcp://127.0.0.1:7000');
const logger = new LoggerClient(transport);

logger.log(undefined, 2);

