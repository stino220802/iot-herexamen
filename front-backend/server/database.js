require('dotenv').config();
const mysql = require('mysql2');

const connection = mysql.createConnection(process.env.DATABASE_URL);
console.log('Connected to PlanetScale!');

module.exports = {
    postData: function(testData){
       connection.query('INSERT INTO test SET ?', testData, function (error, results, fields){
            if(error) throw error; 
            console.log('email sended succesfully'); 
            connection.end();
       }) ;
    }, 
    getData: function(){
        connection.query('SELECT * FROM test', function(err, rows){
            if(err) {
                console.log('error', err); 
            }
            else{
                console.log('data = ', rows); 
            }
        }); 
    },
};