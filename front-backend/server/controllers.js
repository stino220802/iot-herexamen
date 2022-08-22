const { generateKey } = require('crypto');
const asynchandler = require('express-async-handler'); 
const { checkIfEmailIsNotUsed, comparePassword, getUserData } = require('./database.js');



const database = require("./database.js"); 
const generateWebToken = require('./webtoken.js');

const registerUser = asynchandler(async(req, res) => {

    const { username, email, password} = req.body;



    const existingUser = await database.checkIfEmailIsNotUsed(email);

   
    if(existingUser){
        res.status(400);
        throw new Error("user already exists");  
    }

    const user = await database.createNewUser(username, email, password); 
    
    console.log(user);

    const userData = await getUserData(email); 

    if(user == true){
        res.status(201).json({
            id: userData.id, 
            name: userData.username,
            email: userData.email,
            admin: userData.admin,
            token:generateWebToken(userData.id),
        }); 
    }
    else if(user == false){
        res.status(400);
        throw new Error("something went wrong while inserting into database"); 
    }
      
}); 

const authorization = asynchandler(async (req, res) => {
    const{email, password} = req.body; 
    console.log(req.body);
    const userExists = await checkIfEmailIsNotUsed(email);

    if(!userExists){
        res.status(400);
        throw new Error("invalid email"); 
    }

    const passMatch = await comparePassword(email, password);
    const userData = await getUserData(email); 
    if(passMatch){
        res.json({
            _id: userData.id,
            username: userData.username, 
            email: userData.email,
            admin: userData.admin,
            token:generateWebToken(userData.id),
            
        });
    }
    else{
        res.status(400); 
        throw new Error("Wrong Password"); 
    }
});


module.exports = { registerUser, authorization }; 