const { error } = require("console");
const express = require("express");
const { title } = require("process");
const app = express();
app.use(express.json());
require("dotenv").config();
const mongoose = require("mongoose");
const httpStatusText = require("./utils/httpStatus");

const URL = process.env.MONGO_URL;
mongoose.connect(URL).then(() => {
  console.log("Connected To DB");
});

const coursesRouter = require("./routes/courses.route");
app.use("/api/Courses", coursesRouter);
app.all("*", (req, res, next) => {
  return res
    .status(404)
    .json({ status: httpStatusText.ERROR, msg:"Not Found"});
});
app.use((error , req,res,next)=>{
  return res
  .status(500)
  .json({ status: httpStatusText.ERROR, msg:error.message});
})
app.listen(process.env.PORT | 5000, () => {
  console.log("listen on Port 5000");
});
