const TransportInterface = require('./TransportInterface');
const zeroMQ = require('zeromq');


/**
 *
 * @param {string!} address - Base address including protocol and port (ex: tcp://127.0.0.1:8080)
 * @constructor
 */
function TransportClient(address) {
    TransportInterface.call(this);

    const zmqSocket = zeroMQ.createSocket('pub');
    zmqSocket.connect(address);

    /**
     *
     * @param {string} channel
     * @param {Object} logObject
     */
    this.send = function (channel, logObject) {

        const serializedLog = JSON.stringify(logObject);

        console.log('sending on', channel, 'serialized', serializedLog);
        zmqSocket.send([channel, serializedLog]);
    }
}

module.exports = TransportClient;
