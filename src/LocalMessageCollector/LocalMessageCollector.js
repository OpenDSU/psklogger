const zeroMQ = require('zeromq');

/**
 * Creates a ZeroMQ Subscriber that listens on 'logs' topic on the specified address for a publisher
 * @param {string!} address - Base address including protocol and port (ex: tcp://127.0.0.1:8080)
 * @param {function!} onMessageCallback
 * @constructor
 */
function LocalMessageCollector(address, onMessageCallback) {
    const zmqSocket = zeroMQ.createSocket('sub');

    zmqSocket.subscribe('logs');
    zmqSocket.connect(address);

    zmqSocket.on('message', onMessageCallback);

    const events = ["SIGINT", "SIGUSR1", "SIGUSR2", "uncaughtException", "SIGTERM", "SIGHUP"];

    events.forEach(event => {
        process.on(event, () => {
            zmqSocket.close();
        });
    });
}

module.exports = LocalMessageCollector;
