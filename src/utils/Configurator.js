const config = {
    addressForPublishers: 'tcp://127.0.0.1:7000',
    addressForSubscribers: 'tcp://127.0.0.1:7001',
    addressForCollector: 'tcp://127.0.0.1:5558'
};

module.exports = {
    getConfig () {
        return Object.freeze(config);
    }
};
