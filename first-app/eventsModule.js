const EventEmitter = require("events");
// const emitter = new EventEmitter();
const Logger = require("./logger");
const logger = new Logger();
//Register a listener
logger.on("messageLogged", (arg) => {
  console.log("Listener Called", arg);
});

// emitter.emit("messageLogged", { id: 1, url: "https://" }); //Raise an event
//Emit means making a noise - producing a signals
logger.log("Hey Man!! ");
