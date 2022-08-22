require('dotenv').config();
const mysql = require('mysql');
const util = require('util');
const bcrypt = require('bcryptjs'); 
const { v4: uuidv4 } = require('uuid');

const connection = mysql.createConnection(process.env.DATABASE_URL);

const query = util.promisify(connection.query).bind(connection); 
console.log('Connected to PlanetScale!');

module.exports = {
    deleteFromLastknown: async function(sensor_id){
        try{
            const t = await query('DELETE FROM lastknown WHERE ID = ?', sensor_id);
            console.log("delete successfull"); 
        }
        catch(e){
            console.log(e);
        }
    },
    postDataLastknown: async function(sensor_id, value, ip){
        try{
       const post = await query('INSERT INTO lastknown (ID, NAME, external_ip) VALUES (?, ?, ?)', [sensor_id, value, ip]);
       if(post.affectedRows == 1){
        return true; 
       }
       else{
        return false; 
       }
        }
        catch(e){
            console.log(e);
        }
    }, 
    getDataLastknown: async function(){
        try{   
        const get = await query('SELECT * FROM lastknown ORDER BY created_at'); 
        return get; 
        }
        catch(e){
            console.log(e);
        }
        
    },
    
    postDataFuture_proof: async function(sensor_id, value){
        try{
       const post = await query('INSERT INTO future_proof (sensor_id, value) VALUES(?, ?)', [sensor_id, value]); 
       if(post.affectedRows == 1){
        return true; 
       }
       else{
        return false; 
       }
        }
        catch(e){
            console.log(e);
        }

     
    }, 

    getDataFuture_proof: async function(){
        try{
        const get = await query('SELECT * FROM future_proof ORDER BY created_at');
        return get; 
    }
        catch(e){
            console.log(e);
        }
    },
    checkIfEmailIsNotUsed: async function(emailInput){
        try{
            const posts = await query('SELECT * FROM user_data');
            for(let i = 0; i < posts.length; i++){
                if(posts[i].email == emailInput){
                    return true; 
                }
            }
            return false; 
        }
        catch(e){
            console.log(e); 
        }

    },
  
    createNewUser: async function(username, email, password){
        try{
            const id = await uuidv4();
            const salt = await bcrypt.genSalt(10); 
            password2 = await bcrypt.hash(password, salt);
            const posts = await query('INSERT INTO user_data (id, username, email, password) VALUES(?, ?, ?, ?)', [id, username, email, password2], ); 
            if(posts.affectedRows == 1){
                return true; 
            }
            else{
                return false;
            }
        }
        catch(e){
            console.log(e); 
        }
    }, 
    comparePassword: async function(inputEmail, inputPassword ){
        try{
        const get = await query('SELECT * FROM user_data');
        var index = 0;
         
        for(let i = 0; i < get.length; i++){
            if(get[i].email == inputEmail){
                index = i; 
            }
        }
        return await bcrypt.compare(inputPassword, get[index].password);
        
    }
    catch(e){
        console.log(e);
    }
    },

    getUserData: async function(inputEmail){
        try{
            const get = await query('SELECT * FROM user_data'); 
            var index = 0;

            for(let i = 0; i < get.length; i++){
                if(get[i].email == inputEmail){
                    index = i;
                }
            }
            return get[index]; 
        }
        catch(e){
            console.log(e);
        }
    },
};



