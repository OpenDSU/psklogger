function getTime() {
    if(process.env.context === 'sandbox') {

        return Date.now()
    } else {
        const {performance} = require('perf_hooks');

        return performance.now() + performance.timeOrigin;
    }
}


function createLog(logLevel, meta, messages) {
    return {
        level: logLevel,
        messages: messages,
        meta: meta,
        time: getTime()
    }
}

function createEvent(meta, messages) {
    return {
        messages,
        meta,
        time: getTime()
    };
}

module.exports = {
    createLog,
    createEvent
};
