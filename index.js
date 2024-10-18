const { error } = require("console");
const express = require("express");
const { title } = require("process");
const app = express();
app.use(express.json());
let { Courses } = require("./data/courses");

const coursesRouter = require("./routes/courses.route");
app.use("/api/Courses", coursesRouter);

app.listen(5000, () => {
  console.log("listen on Port 5000");
});
