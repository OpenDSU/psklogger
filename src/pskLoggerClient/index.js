const Configurator = require('../utils/Configurator');
const LoggerClient = require('../LoggerClient').LoggerClient;
const MessagePublisher = require('../MessagePublisher').MessagePublisher;


function PSKLogger () {

    const config = Configurator.getConfig();
    const messagePublisher = new MessagePublisher(config.addressForPublishers);
    const logger = new LoggerClient(messagePublisher);

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
