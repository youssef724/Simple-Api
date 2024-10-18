const courses = require("../data/courses");
let { Courses } = require("../data/courses");
const { body, validationResult } = require("express-validator");

const getAllCourses = (req, res) => {
  res.json(Courses);
};

const getSingleCourse = (req, res) => {
  const courseId = +req.params.id;
  const course = Courses.find((course) => course.id === courseId);
  if (!course) {
    return res.status(404).send("error");
  }
  res.json(course);
};

const AddCourse = (req, res) => {
  const errors = validationResult(req);
  console.log(errors);
  if (!errors.isEmpty()) {
    return res.status(404).json(errors.array());
  }
  const newCourse = req.body;
  Courses.push({ id: Courses.length + 1, ...newCourse });
  res.json("added");
};

const EditCourse = (req, res) => {
  const courseId = +req.params.id;
  let course = Courses.find((course) => course.id === courseId);
  if (!course) {
    return res.status(404).send("Not Exist");
  }

  course = { ...course, ...req.body };
  res.status(200).json("Edited");
};
const DeleteCourse = (req, res) => {
  const courseId = +req.params.id;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(404).json(errors.array());
  }
  Courses = Courses.filter((course) => course.id !== courseId);
  res.status(200).json("Course Deleted");
};

module.exports = {
  getAllCourses,
  getSingleCourse,
  AddCourse,
  EditCourse,
  DeleteCourse,
};
