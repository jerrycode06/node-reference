const Joi = require("joi-browser");
const express = require("express");
const app = express();

app.use(express.json());

const courses = [
  { id: 1, name: "Course 1" },
  { id: 2, name: "Course 2" },
  { id: 3, name: "Course 3" },
];

app.get("/", (req, res) => {
  res.send("Hello World, I am Edith");
});

app.get("/api/courses", (req, res) => {
  res.send(courses);
});

app.post("/api/courses", (req, res) => {
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

app.get("/api/courses/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course)
    return res.status(404).send("Course with given ID not found in Data");
  res.send(course);
});

app.put("/api/courses/:id", (req, res) => {
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

function validate(course) {
  const schema = {
    name: Joi.string().min(3).required(),
  };

  return Joi.validate(course, schema);
}

app.delete("/api/courses/:id", (req, res) => {
  //Look Up the course , if not found its a bad request status(404)
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course)
    return res.status(404).send("Course with given ID not found in Data");

  //Delete that course
  const index = courses.indexOf(course);
  courses.splice(index, 1);

  res.send(course);
});

app.get("/api/posts/:year/:month", (req, res) => {
  // res.send(req.params.id);
  // res.send(req.params);
  res.send(req.query);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on Port ${port}`));
