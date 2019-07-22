const EnvironmentDataProvider = require('./src/utils').EnvironmentDataProvider;
const MessagePublisher = require('./src/MessagePublisher');
const MessageSubscriber = require('./src/MessageSubscriber');
const PSKLogger = require('./src/pskLoggerClient/index');
const PubSubProxy = require('./src/PubSubProxy');

if(!global.hasOwnProperty('$$')) {
    global.$$ = {};
}


/**
 * Overwrite this to provide relevant information for other environments (ex: for domains, browser etc.)
 * @interface
 */
if(!global.$$.hasOwnProperty('getEnvironmentData')) {
    global.$$.getEnvironmentData = EnvironmentDataProvider.getEnvironmentData;
}

function overwriteConsole() {
    const logger = new PSKLogger();

    const originalConsole = {};
    Object.keys(console).forEach(key => originalConsole[key] = console[key]);

    Object.keys(logger).forEach(key => {
       console[key] = function() {
           const log = logger[key].apply(logger, arguments);

           originalConsole[key].apply(originalConsole, [`[${log.meta.context}]`, ...log.messages]);
       }
    });
}

module.exports = {
    MessagePublisherModule: MessagePublisher,
    MessageSubscriberModule: MessageSubscriber,
    overwriteConsole,
    PSKLogger,
    PubSubProxyModule: PubSubProxy
};
