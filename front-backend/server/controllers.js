const asynchandler = require('express-async-handler'); 
const { checkIfEmailIsNotUsed, comparePassword } = require('./database.js');

//const userSchema = require("./model"); 

const database = require("./database.js"); 

const registerUser = asynchandler(async(req, res) => {

    const { username, email, password} = req.body;



    const existingUser = await database.checkIfEmailIsNotUsed(email);

    //console.log("existing" , existingUser);

    if(existingUser){
        res.status(400);
        throw new Error("user already exists");  
    }

    const user = await database.createNewUser(username, email, password); 
    
    console.log(user);

    if(user == true){
        res.status(201).json({
            name: username,
            email: email,
        }); 
    }
    else if(user == false){
        res.status(400);
        throw new Error("something went wrong while inserting into database"); 
    }
      
}); 

const authorization = asynchandler(async (req, res) => {
    const{email, password} = req.body; 
    const userExists = await checkIfEmailIsNotUsed(email);

    if(!userExists){
        res.status(400);
        throw new Error("invalid email"); 
    }

    const passMatch = await comparePassword(email, password);
    if(passMatch){
        res.json({
            email: email,
        });
    }
    else{
        res.status(400); 
        throw new Error("Wrong Password"); 
    }
});


module.exports = { registerUser, authorization }; 