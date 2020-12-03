const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  // res.send("Hello World, I am Edith");
  res.render("index", { title: "My Express App", message: "Hello I am Edith" }); // For Rendering our pug file
});

module.exports = router;
