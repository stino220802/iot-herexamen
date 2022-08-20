require('dotenv').config();
const mysql = require('mysql');
const util = require('util');
const bcrypt = require('bcryptjs'); 

const connection = mysql.createConnection(process.env.DATABASE_URL);

const query = util.promisify(connection.query).bind(connection); 
console.log('Connected to PlanetScale!');

module.exports = {
    postDataLastknown: function(sensor_id, value, ip, oldDate){
       connection.query('INSERT INTO lastknown (ID, NAME, external_ip, created_at) VALUES (?, ?, ?, ?)', [sensor_id, value, ip, oldDate], function (error, results, fields){
            if(error) throw error; 
            console.log('email sended succesfully'); 
            
       }) ;
    }, 
    getDataLastknown: function(){
        connection.query('SELECT * FROM lastknown ORDER BY created_at', function(err, rows){
            if(err) {
                console.log('error', err); 
            }
            else{
                console.log('data = ', rows); 
            }
        }); 
    },
    
    postDataFuture_proof: function(sensor_id, value, oldDate){
       connection.query('INSERT INTO future_proof (sensor_id, value, created_at) VALUES(?, ?, ?)', [sensor_id, value, oldDate], function (error, results, fields){
            if(error) throw error; 
            console.log('email sended succesfully'); 
            connection.end();
       }); 
    }, 

    getDataFuture_proof: function(){
        connection.query('SELECT * FROM future_proof ORDER BY created_at', function(err, rows){
            if(err) {
                console.log('error', err); 
            }
            else{
                console.log('data = ', rows); 
            }
        }); 
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
   /* checkIfEmailIsNotUsed: async function(emailInput){
        connection.query('SELECT * FROM user_data');
    }*/
    createNewUser: async function(username, email, password){
        try{
            const salt = await bcrypt.genSalt(10); 
            password2 = await bcrypt.hash(password, salt);
            const posts = await query('INSERT INTO user_data (username, email, password) VALUES(?, ?, ?)', [username, email, password2], ); 
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
};

/*module.exports = {
    postData: function(sensor_id, value, oldDate){
       connection.query('INSERT INTO future_proof SET ?', testData, function (error, results, fields){
            if(error) throw error; 
            console.log('email sended succesfully'); 
            connection.end();
       }) ; */
     /*  const m = require('mysql'); 
       const {makeDb} = require('mysql-async-simple'); 

       const conn =  m.createConnection(process.env.DATABASE_URL);
       const db = makeDb(); 
       await db.connect(m);

       try{
       const test = await db.query(m, 'SELECT * FROM user_data'); 
       }
       catch(e){
           console.log("error", err);
       }
       finally{
           await db.close(m); 
           //return test; 
       }
       /*, function(err, rows){
           if(err){
               console.log('error', err); 
           }
           else{
                var found = false; 
               for(let i = 0; i < rows.length; i++){
                   if(rows[i].email == emailInput){
                       found = true; 
                       return found;  
                   }
               }
           }
       });*/

       /*connection.query('INSERT INTO user_data (username, email, password) VALUES(?, ?, ?)', [username, email, password], function (error, results, fields){
        if(error){
            console.log(err);
        }
        else{
            if(results.affectedRows == 1){
                console.log("succesfull");
                return true; 
            }
            else{
                return false;
            }
        }
        });*/