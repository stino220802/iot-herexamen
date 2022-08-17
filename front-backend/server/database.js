require('dotenv').config();
const mysql = require('mysql2');

const connection = mysql.createConnection(process.env.DATABASE_URL);
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
};

/*module.exports = {
    postData: function(sensor_id, value, oldDate){
       connection.query('INSERT INTO future_proof SET ?', testData, function (error, results, fields){
            if(error) throw error; 
            console.log('email sended succesfully'); 
            connection.end();
       }) ; */