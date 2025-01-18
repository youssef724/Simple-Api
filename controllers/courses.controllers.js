const { query } = require("express");
const Course = require("../models/course.model");
const httpStatusText = require("../utils/httpStatus.js");
const { body, validationResult } = require("express-validator");
const asyncWrapper = require("../middleware/asyncWrapper.js");
const getAllCourses = asyncWrapper(async (req, res) => {
  const query = req.query;
  const limit = query.limit || 10;
  const page = query.page || 1;
  const skip = (page - 1) * limit;
  const courses = await Course.find().limit(limit).skip(skip);
  res.json({ status: httpStatusText.SUCCESS, data: { courses } });
});

const getSingleCourse = asyncWrapper(async (req, res) => {
  const course = await Course.findById(req.params.id);
  if (!course) {
    return res
      .status(404)
      .send({ status: httpStatusText.FAIL, data: { course: "Not found" } });
  }
  return res.json({ status: httpStatusText.SUCCESS, data: { course } });
});

const AddCourse = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(404)
      .json({ status: httpStatusText.FAIL, data: errors.array() });
  }
  const newCourse = new Course(req.body);
  await newCourse.save();
  res.status(201).json({ status: httpStatusText.SUCCESS, data: { newCourse } });
};

const EditCourse = async (req, res) => {
  const id = req.params.id;
  try {
    const updatedCourse = await Course.updateOne(
      { _id: id },
      { $set: { ...req.body } }
    );
    if (!updatedCourse) {
      return res.status(404).send("Not Exist");
    }
    return res.status(200).json(updatedCourse);
  } catch (err) {
    return res.status(404).send(err);
  }
};
const DeleteCourse = async (req, res) => {
  try {
    const deletedOne = await Course.deleteOne({ _id: req.params.id });
    res.status(200).json({ status: httpStatusText.SUCCESS, data: null });
  } catch (err) {
    return res.status(404).send(err);
  }
};

module.exports = {
  getAllCourses,
  getSingleCourse,
  AddCourse,
  EditCourse,
  DeleteCourse,
};
