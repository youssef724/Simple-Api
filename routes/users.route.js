const express = require("express");
const router = express.Router();
const userController = require("../controllers/users.controllers")
const VerifyToken = require('../middleware/auth')
/* get all users
   login
   register
*/
router.route("/").get(VerifyToken , userController.getAllUsers)
router.route("/Register").post(userController.Register)
router.route("/Login").post(userController.Login)


module.exports = router;

