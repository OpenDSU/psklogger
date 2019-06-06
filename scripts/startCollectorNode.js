const Configurator = require('../src/utils').Configurator;
const MessageSubscriber = require('../src/MessageSubscriber').MessageSubscriber;
const cluster = require('cluster');

if(cluster.isMaster) {
    // needs to be different process, otherwise it might loose messages if subscribers are slow

    const Configurator = require('../src/utils').Configurator;
    const PubSubProxy = require('../src/PubSubProxy');


    const config = Configurator.getConfig();
    new PubSubProxy(config);

    cluster.fork();

} else {
    const sqlite3 = require('better-sqlite3');
    
    const db = sqlite3('logs.db');
    db.pragma('journal_mode = WAL');
    db.prepare('CREATE TABLE IF NOT EXISTS LOGS (log TEXT)').run();


    const config = Configurator.getConfig();
    let counter = 0;

    new MessageSubscriber(config.addressForSubscribers, ['logs'], (topic, message) => {
        db.prepare('INSERT INTO LOGS VALUES (json(?))').run(message.toString());

        console.log(++counter, JSON.parse(message.toString()).messages[1] + 1);
        
    });


    process.on('exit', () => db.close());
    process.on('SIGHUP', () => process.exit(128 + 1));
    process.on('SIGINT', () => process.exit(128 + 2));
    process.on('SIGTERM', () => process.exit(128 + 15));
}


