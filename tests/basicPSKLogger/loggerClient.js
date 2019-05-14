console.log('I am a client');

const PSKLogger = require('../../index').PSKLogger;

const logger = new PSKLogger();

console.log('send');

logger.debug('test');



