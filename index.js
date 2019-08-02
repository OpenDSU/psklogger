const PSKLogger = require('./src/PSKLoggerClient/index');
const EnvironmentDataProvider = require('./src/utils').EnvironmentDataProvider;


if(!global.hasOwnProperty('$$')) {
    global.$$ = {};
}


/**
 * @deprecated
 * PSKLogger should be used as is without overwriting console.
 * The functionality should be added to PSKLogger to log to console the message and useful metadata
 */
function overwriteConsole() {
    if(process.env.context === 'sandbox') {
        console.log("Execution detected in sandbox, console won't be overwritten");
        return;
    }

    const logger = PSKLogger.getLogger();

    const originalConsole = {};
    Object.keys(console).forEach(key => originalConsole[key] = console[key]);

    Object.keys(logger).forEach(key => {
        if(key != "log") {
            console[key] = function () {

                const log = logger[key].apply(logger, arguments);

                const context = getContextForMeta(log.meta);

                if (originalConsole.hasOwnProperty(key)) {
                    originalConsole[key].apply(originalConsole, [`[${context}]`, ...log.messages]);
                }
            }
        } else {
            console.log = function(...args){
                if(args[0] == undefined) throw new Error("Printing an undefined throws this error");
                //logger.log(...args); ignore console logs... ;)
                const log = logger[key].apply(logger, arguments);
                /*const context = getContextForMeta(log.meta) + " log:\n\r";
                args.unshift(context) */
                originalConsole.log(...args);
            }
        }
    });


    /**
     * @return {string|*}
     */
    function getContextForMeta(meta) {
        const contexts = {
            node: (meta) => `node:${meta.context}`,
            domain: (meta) =>`domain:${meta.domain}`,
            agent: (meta) => `domain:${meta.domain}:agent:${meta.agent}`,
            sandbox: () => `sandbox`
        };

        if (contexts.hasOwnProperty(meta.origin)) {
            return contexts[meta.origin](meta);
        } else {
            return '';
        }
    }
}

if (process.env.context !== 'sandbox') {

    const MessagePublisher = require('./src/MessagePublisher');
    const MessageSubscriber = require('./src/MessageSubscriber');
    const PubSubProxy = require('./src/PubSubProxy');

    function enableEnvironmentDataDefault() {
        global.$$.getEnvironmentData = EnvironmentDataProvider.getEnvironmentData;
    }

    function enableEnvironmentDataForAgent() {
        global.$$.getEnvironmentData = EnvironmentDataProvider.getEnvironmentDataForAgent;
    }

    function enableEnvironmentDataForDomain() {
        global.$$.getEnvironmentData = EnvironmentDataProvider.getEnvironmentDataForDomain;
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

    module.exports.MessagePublisherModule  = MessagePublisher;
    module.exports.MessageSubscriberModule = MessageSubscriber;
    module.exports.PubSubProxyModule       = PubSubProxy;
} else {
    global.$$.getEnvironmentData = EnvironmentDataProvider.getEnvironmentDataForSandbox;
}


module.exports.overwriteConsole = overwriteConsole;
module.exports.PSKLogger = PSKLogger;
