const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const courseController = require("../controllers/courses.controllers");


router.route("/")
            .get(courseController.getAllCourses)
            .post(
              body("title").notEmpty(),
              body("price").notEmpty(),
              courseController.AddCourse
            )


router.route("/:id")
            .get(courseController.getSingleCourse)
            .patch(courseController.EditCourse)
            .delete(courseController.DeleteCourse);

module.exports = router;

