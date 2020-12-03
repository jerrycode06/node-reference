const config = require("config");
const helmet = require("helmet");
const morgan = require("morgan");
const debug = require("debug")("app:startup");
// const dbDebugger = require("debug")("app:db");
const express = require("express");
const courses = require("./routes/courses");
const home = require("./routes/home");
const logger = require("./middleware/logger");
const authenticater = require("./middleware/authenticate");
const { urlencoded } = require("express");
const app = express();

//Setting the template engine so we dont't have to require the pug engine
app.set("view engine", "pug");
app.set("views", "./views"); //that's a default so we don't have to set that, I am just showing that these are in views folder

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(helmet());
app.use("/api/courses", courses);
app.use("/", home);
// console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
// console.log(app.get("env"));

if (app.get("env") === "development") {
  app.use(morgan("tiny"));
  debug("Morgan Enabled....");
}

//DB Work
// dbDebugger("Connected to Database");

app.use(logger);
app.use(authenticater);
// app.use((req, res, next) => {
//   console.log("Authenticating....");
//   next();
// });

//Configuration
console.log(`Application: ${config.get("name")}`);
console.log(`Mail: ${config.get("mail.host")}`);
// console.log(`Password: ${config.get("mail.password")}`);

app.get("/api/posts/:year/:month", (req, res) => {
  // res.send(req.params.id);
  // res.send(req.params);
  res.send(req.query);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on Port ${port}`));
