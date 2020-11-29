// (function (exports, require, module, __filename, __dirname) {  --> Module Wrapper Function
// console.log(__dirname);
// console.log(__filename);
const EventEmitter = require("events");
var url = "htttp://mylogger.io/log";
class Logger extends EventEmitter {
  log(message) {
    //Sends a HTTP Request
    console.log(message);
    this.emit("messageLogged", { id: 1, url: "https://" }); //Raise an event
  }
}
// module.exports.log = log;
module.exports = Logger;
