const LoggerClient = require('../../src/LoggerClient/LoggerClient');
const TransportClient = require('../../src/TransportClient/TransportClient');

const transport = new TransportClient('tcp://127.0.0.1:7000');

const logger = new LoggerClient(transport);

logger.log(undefined, 2);
