const TransportInterface = require('./TransportInterface');

module.exports = {
    TransportInterface
};

if(process.env.context === 'sandbox') {
    module.exports.MessagePublisher = require('./MessagePublisherForSandbox');
} else {
    module.exports.MessagePublisher = require('./MessagePublisher');
}
