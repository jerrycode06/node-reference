const Joi = require("joi-browser");
const express = require("express");
const router = express.Router();

const genres = [
  { id: 1, name: "Comedy" },
  { id: 2, name: "Action" },
  { id: 3, name: "Romance" },
  { id: 4, name: "Thriller" },
];

// router.get("/", (req, res) => {
//   res.send("This is Generes API");
// });

router.get("/", (req, res) => {
  res.send(genres);
});

router.get("/:id", (req, res) => {
  const genre = genres.find((c) => c.id === parseInt(req.params.id));
  if (!genre) return res.status(404).send("Genre of this ID not found");

  res.send(genre);
});

router.post("/", (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = {
    id: genres.length + 1,
    name: req.body.name,
  };
  genres.push(genre);
  res.send(genre);
});

router.put("/:id", (req, res) => {
  const genre = genres.find((c) => c.id === parseInt(req.params.id));
  if (!genre) return res.status(404).send("Genre of this ID not found");

  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  genre.name = req.body.name;
  res.send(genre);
});

router.delete("/:id", (req, res) => {
  const genre = genres.find((c) => c.id === parseInt(req.params.id));
  if (!genre) return res.status(404).send("Genre of this ID not found");

  const index = genres.indexOf(genre);
  genres.splice(index, 1);

  res.send(genre);
});

const validate = (genre) => {
  const schema = {
    name: Joi.string().min(3).required(),
  };

  return Joi.validate(genre, schema);
};

module.exports = router;
