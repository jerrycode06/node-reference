const os = require("os");
var totalMemory = os.totalmem();
var freeMemory = os.freemem();

console.log(`Total Memory is ${totalMemory}`);
console.log(`Free Memory is ${freeMemory}`);
