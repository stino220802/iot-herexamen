// lib imports 
const express = require("express"); 
const router = express.Router(); 

//personal file imports
const { registerUser, authorization } = require("./controllers.js"); 

router.route("/").post(registerUser); 
router.route("/login").post(authorization); 

module.exports = router; 