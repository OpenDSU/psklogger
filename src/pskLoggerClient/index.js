const LoggerClient = require('../LoggerClient').LoggerClient;
const TransportClient = require('../MessageConnectorClient').TransportClient;


function PSKLogger () {
    const transport = new TransportClient('tcp://127.0.0.1:7777');
    const logger = new LoggerClient(transport);

    function debug(...params) {
        const meta = prepareMeta();
        logger.debug(meta, ...params);
    }

    function error(...params) {
        const meta = prepareMeta();
        logger.error(meta, ...params);
    }

    function info(...params) {
        const meta = prepareMeta();
        logger.info(meta, ...params);
    }

    function log(...params) {
        const meta = prepareMeta();
        logger.log(meta, ...params);
    }

    function warn(...params) {
        const meta = prepareMeta();
        logger.warn(meta, ...params);
    }

    function prepareMeta() {
        const processPath = process.argv[1];
        const processRelativePath = processPath.split('/modules/', 2)[1];
        return {
            processPath: processRelativePath
        };
    }


    this.debug = debug;
    this.error = error;
    this.info = info;
    this.log = log;
    this.warn = warn;

}

module.exports = PSKLogger;
