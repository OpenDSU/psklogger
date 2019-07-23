const {performance} = require('perf_hooks');

function createLog(logLevel, meta, messages) {
    return {
        level: logLevel,
        messages: messages,
        meta: meta,
        time: new Date(),
        msTime: performance.now() + performance.timeOrigin
    }
}

module.exports = {
    createLog
};
