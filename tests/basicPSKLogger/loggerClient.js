const PSKLogger = require('../../index').PSKLogger;
const server = require('../../src/TransportServer').TransportServer;

server('tcp://127.0.0.1:7777', (topic, message) => {
    console.log(`${topic} >> ${message}`);
});

const logger = new PSKLogger();

logger.debug('test');
