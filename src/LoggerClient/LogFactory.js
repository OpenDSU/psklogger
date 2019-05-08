class LogFactory {
    static createLog(logLevel, meta, messages) {
        return {
            level: logLevel,
            messages: messages,
            meta: meta,
            time: new Date()
        }
    }
}


module.exports = LogFactory;
