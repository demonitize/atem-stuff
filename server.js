const { Atem } = require("atem-connection"); // Library for ATEM
const colors = require('colors/safe'); // Library for console colors
const config = require("./config.json"); // config import
var cache;
const myAtem = new Atem({debugBuffers:config.connection.debug}); // Init ATEM
if (config.connection.debug) {
    myAtem.on('info', console.log); // Register ATEM events
    myAtem.on('debug', console.log); // Register ATEM events
}
myAtem.on('error', console.error); // Register ATEM events

myAtem.connect(config.connection.ip); // Define the ATEM IP address

myAtem.on('stateChanged', (state, pathToChange) => {
    if (state.streaming.stats.cacheUsed == cache) return;
    cache = state.streaming.stats.cacheUsed; // The cache level 
    switch (cache) {
        case this == 100:
            console.error(colors.bgRed(` ALERT! CACHE IS FULL! Please check the network connection, and restart stream. Current cache usage: ${cache}% `));
            break;
        case this >= 95:
            console.warn(colors.bgRed(` WARNING! Cache level is above 95%. Current cache usage: ${cache}% `));
            break;
        case this >= 85:
            console.warn(colors.bgYellow(` WARNING! Cache level is above 85%. Current cache usage: ${cache}% `));
            break;
        case this >= 75:
            console.warn(colors.bgYellow(` WARNING! Cache level is above 75%. Current cache usage: ${cache}% `));
            break;
        case this >= 50:
            console.warn(colors.bgGreen(` INFO! Cache level is above 50%. Current cache usage: ${cache}% `));
            break;
        default:
            console.log(colors.bgCyan(` INFO: Cache level at ${cache}% `));
            break;

    }

});