const Configurator = require('../utils/Configurator');
const LoggerClient = require('../LoggerClient').LoggerClient;
const MessagePublisher = require('../MessagePublisher').MessagePublisher;


function PSKLogger () {

    const config = Configurator.getConfig();
    const messagePublisher = new MessagePublisher(config.addressForPublishers);
    const logger = new LoggerClient(messagePublisher);

    function debug(...params) {
        const meta = prepareMeta();
        return logger.debug(meta, ...params);
    }

    function error(...params) {
        const meta = prepareMeta();
        return logger.error(meta, ...params);
    }

    function info(...params) {
        const meta = prepareMeta();
        return logger.info(meta, ...params);
    }

    function log(...params) {
        const meta = prepareMeta();
        return logger.log(meta, ...params);
    }

    function warn(...params) {
        const meta = prepareMeta();
        return logger.warn(meta, ...params);
    }

    function event(event, ...params) {
        const meta = prepareMeta();
        return logger.event(event, meta, ...params);
    }

    function prepareMeta() {
        if(global.$$.getEnvironmentData) {
            return global.$$.getEnvironmentData();
        }
    }


    this.debug = debug;
    this.error = error;
    this.info = info;
    this.log = log;
    this.warn = warn;
    this.event = event;

}

module.exports = PSKLogger;
