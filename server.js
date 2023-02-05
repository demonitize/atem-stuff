const {Atem} = require("atem-connection"); // Library for ATEM
const colors = require('colors/safe'); // Library for console colors
var cache;
const myAtem = new Atem(); // Init ATEM
myAtem.on('info', console.log); // Register ATEM events
myAtem.on('error', console.error); // Register ATEM events

myAtem.connect('192.168.100.89'); // Define the ATEM IP address

myAtem.on('stateChanged', (state, pathToChange) => {
    if (state.streaming.stats.cacheUsed == cache) return;
	cache = state.streaming.stats.cacheUsed; // The cache level 
    if (cache == 100) {
        console.error(colors.bgRed(` ALERT! CACHE IS FULL! Please check the network connection, and restart stream. Current cache usage: ${cache}% `));
    } else if (cache >= 95) {
        console.warn(colors.bgRed(` WARNING! Cache level is above 95%. Current cache usage: ${cache}% `));
    } else if (cache >= 85) {
        console.warn(colors.bgYellow(` WARNING! Cache level is above 85%. Current cache usage: ${cache}% `));
    } else if (cache >= 75) {
        console.warn(colors.bgYellow(` ALERT! Cache level is above 75%. Current cache usage: ${cache}% `));
    } else if (cache >= 50) {
        console.warn(colors.bgGreen(` ALERT! Cache level is above 50%. Current cache usage: ${cache}% `));
    } else {
        console.log(colors.bgCyan(` INFO: Cache level at ${cache}% `));
    }

});