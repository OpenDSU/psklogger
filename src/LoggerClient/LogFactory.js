const {performance} = require('perf_hooks');

class LogFactory {
    static createLog(logLevel, meta, messages) {
        return {
            level: logLevel,
            messages: messages,
            meta: meta,
            time: new Date(),
            msTime: performance.now() + performance.timeOrigin
        }
    }
}


module.exports = LogFactory;
