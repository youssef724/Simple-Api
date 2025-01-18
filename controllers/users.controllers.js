const Users = require("../models/user.model.js");
const asyncWrapper = require("../middleware/asyncWrapper.js");
const httpStatusText = require("../utils/httpStatus.js");
const bcrypt = require("bcryptjs");
const { find, findOne } = require("../models/course.model.js");
const generateJWT = require('../utils/generateJWT.js')

const getAllUsers = asyncWrapper(async (req, res) => {
  const query = req.query;
  const limit = query.limit || 10;
  const page = query.page || 1;
  const skip = (page - 1) * limit;
  const users = await Users.find({}, { __v: false, Password: false })
    .limit(limit)
    .skip(skip);
  res.json({ status: httpStatusText.SUCCESS, data: { users } });
});

const Register = asyncWrapper(async (req, res) => {
  // console.log(req.body);
  const { firstName, lastName, Email, Password , role} = req.body;
  const user = await Users.findOne({ Email: Email });

  if (user) {
    return res.status(400).json("User already Exist");
  }
  const newPassword = await bcrypt.hash(Password, 10);
  const newUser = new Users({
    firstName,
    lastName,
    Email,
    Password: newPassword,
    role
  });
  await newUser.save();
  const token = await generateJWT({Email: newUser.Email , id:newUser._id})
  newUser.Token = token;

  res.status(201).json({ status: httpStatusText.SUCCESS, data: { newUser } });
});

const Login = asyncWrapper(async(req,res) =>{
      const {Email , Password} = req.body;
      if(!Email || !Password){  
          return res.status(400).json("Email and Password are required");
      }
      const user = await Users.findOne({Email:Email});
    
      const matchPassword = await bcrypt.compare(Password , user.Password);
     
      if(user && matchPassword){
        const token = await generateJWT({Email: user.Email , id:user._id})

        return res.status(201).json({ status: httpStatusText.SUCCESS, data:{token} });
      }
      else{
        return res.status(404).json({ status: httpStatusText.FAIL, data: errors.array() });
      }
    }
);

module.exports = {
  getAllUsers,
  Register,
  Login,
};
