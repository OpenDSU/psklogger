const zeroMQ = require('zeromq');

/**
 *
 * @param {string!} address - Base address including protocol and port (ex: tcp://127.0.0.1:8080)
 * @param {function!} onMessageCallback
 * @constructor
 */
function TransportServer(address, onMessageCallback) {
    const zmqSocket = zeroMQ.createSocket('sub');

    zmqSocket.bindSync(address);
    zmqSocket.subscribe('logs');

    zmqSocket.on('message', onMessageCallback);
}

module.exports = TransportServer;
