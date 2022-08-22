// lib imports 
const express = require("express"); 
const router = express.Router(); 

//personal file imports
const { registerUser, authorization } = require("./controllers.js"); 
const {fromSensor, formPage, getData} = require("./collector.js")

router.route("/formData").post(formPage); 
router.route("/dataCollect").post(fromSensor); 
router.route("/").post(registerUser); 
router.route("/login").post(authorization); 
router.route("/getData").post(getData);
module.exports = router; 