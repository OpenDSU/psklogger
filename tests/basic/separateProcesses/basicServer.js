const LocalCollector = require('../../../src/LocalMessageCollector').LocalMessageCollector;

new LocalCollector('tcp://127.0.0.1:7001', (topic, message) => {
    console.log('log level', topic.toString(), 'message:', message.toString());
    
});

