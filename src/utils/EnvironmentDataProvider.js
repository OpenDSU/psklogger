const path = require('path');
const os = require('os');

const platform = os.platform();

function getEnvironmentData () {
    const processPath = process.argv[1];
    const lastSep = processPath.lastIndexOf(path.sep);
    const processStartFile = processPath.substring(lastSep + 1);
    return {
        context: `node:${processStartFile}`,
        processStartFile: processStartFile,
        platform: platform
    };
}

module.exports = {
    getEnvironmentData
};
