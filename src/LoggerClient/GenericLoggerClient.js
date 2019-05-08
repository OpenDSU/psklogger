const LogFactory = require('./LogFactory');

/**
 *
 * @param {TransportInterface} transport
 * @constructor
 */
function GenericLoggerClient(transport) {
    /**
     *
     * @param {{code: Number, name: string}} logLevel
     * @param {Object} meta
     * @param {Array<any>} messages
     */
    function log(logLevel, meta, messages) {
        const log = LogFactory.createLog(logLevel, meta, messages);

        const logChannel = `logs.${logLevel.name}`;
        transport.send(logChannel, log);
    }

    this.log = log;
}

module.exports = GenericLoggerClient;
