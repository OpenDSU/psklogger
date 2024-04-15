try {
    const zmq = "zeromq";
    require(zmq);
} catch (e) {
    //if zeromq module is not available then psk logger can not do it's job
    module.exports = undefined;
    return;
}

const PSKLogger = require('./src/PSKLoggerClient/index');
const EnvironmentDataProvider = require('./src/utils').EnvironmentDataProvider;
const envTypes = require("overwrite-require").constants;

/**
 * @return {string|*}
 */
function getContextForMeta(meta) {
    const contexts = {
        node: (meta) => `node:${meta.context}`,
        domain: (meta) => `domain:${meta.domain}`,
        agent: (meta) => `domain:${meta.domain}:agent:${meta.agent}`,
        sandbox: () => `sandbox`
    };

    if (contexts.hasOwnProperty(meta.origin)) {
        return contexts[meta.origin](meta);
    } else {
        return '';
    }
}

switch ($$.environmentType) {
    case envTypes.NODEJS_ENVIRONMENT_TYPE:
    case envTypes.THREAD_ENVIRONMENT_TYPE:
        module.exports.MessagePublisherModule = require('./src/MessagePublisher');
        module.exports.MessageSubscriberModule = require('./src/MessageSubscriber');
        module.exports.PubSubProxyModule = require('./src/PubSubProxy');
        break;
    default:
    //nothing to do here for now;
}
module.exports.PSKLogger = PSKLogger;