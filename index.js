const PSKLogger = require('./src/pskLoggerClient/index');

function overwriteConsole() {
    const logger = new PSKLogger();

    const originalConsole = {};
    Object.keys(console).forEach(key => originalConsole[key] = console[key]);

    Object.keys(logger).forEach(key => {
       console[key] = function() {
           const log = logger[key].apply(logger, arguments);

           originalConsole[key].apply(originalConsole, ['[logger]', ...log.messages]);
       }
    });
}

module.exports = {
    overwriteConsole,
    PSKLogger
};
