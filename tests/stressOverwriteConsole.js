// start first a collector node

const PSKLogger = require('../index');

PSKLogger.overwriteConsole();

setTimeout(() => {
    for (let i = 1; i <= 1000000; i++) {
        console.log('{"da": "nu"}', i);

    }
}, 2000);
