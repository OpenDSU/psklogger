const GenericLoggerClient = require('./GenericLoggerClient');
const LogLevel = require('../utils/LogLevel');

/**
 *
 * @param {TransportInterface} messagePublisher
 * @constructor
 */
function LoggerClient(messagePublisher) {

    const genericLoggerClient = new GenericLoggerClient(messagePublisher);


    /************* PUBLIC METHODS *************/

    function debug(meta = {}, ...params) {
        const logLevel = _getLogLevel(LogLevel.debug);

        return genericLoggerClient.log(logLevel, meta, params);
    }

    function error(meta = {}, ...params) {
        const logLevel = _getLogLevel(LogLevel.error);

        return genericLoggerClient.log(logLevel, meta, params);
    }

    function info(meta = {}, ...params) {
        const logLevel = _getLogLevel(LogLevel.info);

        return genericLoggerClient.log(logLevel, meta, params);
    }

    function log(meta = {}, ...params) {
        const logLevel = _getLogLevel(LogLevel.log);

        return genericLoggerClient.log(logLevel, meta, params);
    }

    function warn(meta = {}, ...params) {
        const logLevel = _getLogLevel(LogLevel.warn);

        return genericLoggerClient.log(logLevel, meta, params);
    }


    /************* PRIVATE METHODS *************/

    function _getLogLevel(levelCode) {
        return {
            code: levelCode,
            name: LogLevel[levelCode]
        };
    }


    /************* EXPORTS *************/

    this.debug = debug;
    this.error = error;
    this.info = info;
    this.log = log;
    this.warn = warn;
    this.event = genericLoggerClient.event;
}

module.exports = LoggerClient;
