const TransportInterface = require('./TransportInterface');
const zeroMQ = require('zeromq');
const utils = require('../utils');


/**
 * Creates a ZeroMQ Publisher Socket and connects to the specified address for a ZeroMQ Subscriber
 * @param {string!} address - Base address including protocol and port (ex: tcp://127.0.0.1:8080)
 * @implements TransportInterface
 * @constructor
 */
function TransportClient(address) {
    TransportInterface.call(this);

    const zmqSocket = zeroMQ.createSocket('pub');
    const socket = new utils.BufferedSocket(zmqSocket, utils.SocketType.connectable);


    /************* PUBLIC METHODS *************/

    /**
     *
     * @param {string} channel
     * @param {Object} logObject
     */
    this.send = function (channel, logObject) {
        const serializedLog = JSON.stringify(logObject);

        socket.send([channel, serializedLog]);
    };


    /************* MONITOR SOCKET *************/

    zmqSocket.connect(address);

    const events = ["SIGINT", "SIGUSR1", "SIGUSR2", "uncaughtException", "SIGTERM", "SIGHUP"];

    events.forEach(event => {
        process.on(event, () => {
            zmqSocket.close();
        });
    });
}

module.exports = TransportClient;
