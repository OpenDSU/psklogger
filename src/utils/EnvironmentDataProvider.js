const path = require('path');
const os = require('os');

const platform = os.platform();

function getEnvironmentData () {
    const processPath = process.argv[1];
    const lastSep = processPath.lastIndexOf(path.sep);
    const processStartFile = processPath.substring(lastSep + 1);
    return {
        origin: 'node',
        context: processStartFile,
        processStartFile: processStartFile,
        platform: platform
    };
}

function getEnvironmentDataForDomain() {
    return {
        origin: 'domain',
        domain: process.env.PRIVATESKY_DOMAIN_NAME,
        platform: platform
    }
}

function getEnvironmentDataForAgent() {
    return {
        origin: 'agent',
        domain: process.env.PRIVATESKY_DOMAIN_NAME,
        agent: process.env.PRIVATESKY_AGENT_NAME,
        platform: platform
    }
}

module.exports = {
    getEnvironmentData,
    getEnvironmentDataForAgent,
    getEnvironmentDataForDomain,
};
