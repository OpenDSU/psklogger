const localCollector = require('../../src/LocalMessageCollector').LocalMessageCollector;

localCollector('tcp://127.0.0.1:7777', (topic, message) => {
    console.log(`${topic} >> ${message}`);
});

console.log('Starting collector');
