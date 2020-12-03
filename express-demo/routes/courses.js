const Joi = require("joi-browser");
const express = require("express");
const router = express.Router();

const courses = [
  { id: 1, name: "Course 1" },
  { id: 2, name: "Course 2" },
  { id: 3, name: "Course 3" },
];

router.get("/", (req, res) => {
  res.send(courses);
});

router.post("/", (req, res) => {
  // Validation is must
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //After Validation request sent
  const course = {
    id: courses.length + 1,
    name: req.body.name,
  };
  courses.push(course);
  res.send(course);
});

router.get("/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course)
    return res.status(404).send("Course with given ID not found in Data");
  res.send(course);
});

router.put("/:id", (req, res) => {
  //Look Up the course , if not found its a bad request status(404)
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course)
    return res.status(404).send("Course with given ID not found in Data");

  // Now Validation of course you are sending to update
  // If it fails its a bad request status(400)
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  course.name = req.body.name;
  res.send(course);
});

router.delete("/:id", (req, res) => {
  //Look Up the course , if not found its a bad request status(404)
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course)
    return res.status(404).send("Course with given ID not found in Data");

  //Delete that course
  const index = courses.indexOf(course);
  courses.splice(index, 1);

  res.send(course);
});

function validate(course) {
  const schema = {
    name: Joi.string().min(3).required(),
  };

  return Joi.validate(course, schema);
}

module.exports = router;
