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
 */
if(process.env.hasOwnProperty('PRIVATESKY_AGENT_NAME')) {
    enableEnvironmentDataForAgent();
} else if(process.env.hasOwnProperty('PRIVATESKY_DOMAIN_NAME')) {
    enableEnvironmentDataForDomain()
} else if(!global.$$.hasOwnProperty('getEnvironmentData')) {
    enableEnvironmentDataDefault();
}

function overwriteConsole() {
    const logger = new PSKLogger();

    const originalConsole = {};
    Object.keys(console).forEach(key => originalConsole[key] = console[key]);

    Object.keys(logger).forEach(key => {
       console[key] = function() {
           const log = logger[key].apply(logger, arguments);

           let context = '';

           if(log.meta.origin === 'node') {
               context = `node:${log.meta.context}`;
           } else if (log.meta.origin === 'domain') {
               context = `domain:${log.meta.domain}`;
           } else if (log.meta.origin === 'agent') {
               context = `domain:${log.meta.domain}:agent:${log.meta.agent}`;
           }

           originalConsole[key].apply(originalConsole, [`[${context}]`, ...log.messages]);
       }
    });
}

function enableEnvironmentDataDefault() {
    global.$$.getEnvironmentData = EnvironmentDataProvider.getEnvironmentData;
}

function enableEnvironmentDataForAgent() {
    global.$$.getEnvironmentData = EnvironmentDataProvider.getEnvironmentDataForAgent;
}

function enableEnvironmentDataForDomain() {
    global.$$.getEnvironmentData = EnvironmentDataProvider.getEnvironmentDataForDomain;
}

module.exports = {
    MessagePublisherModule: MessagePublisher,
    MessageSubscriberModule: MessageSubscriber,
    overwriteConsole,
    PSKLogger,
    PubSubProxyModule: PubSubProxy
};
