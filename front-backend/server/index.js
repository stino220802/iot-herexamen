// server/index.js
// import environmental variables
const dotenv = require("dotenv"); 
dotenv.config(); 


// call libs 
const path =  require('path');
const express = require("express");
const helmet = require("helmet"); 
const fs = require('fs'); 

//import personal libs
const database = require("./database.js"); 
const routes = require("./routes.js"); 
// define the port which service is running on
const PORT = process.env.PORT || 3001;

const app = express();

app.use(helmet.frameguard()); 

app.use(express.json()); 

app.use(express.static(path.resolve(__dirname, '../client/build')));

  app.get("/api", (req, res) => {
    res.json({ message: "Hello from server!" });
  });


app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
  });

app.use('/api/users', routes);

app.use('/api/collector', routes); 

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

function censor(censor) {
  var i = 0;
  
  return function(key, value) {
    if(i !== 0 && typeof(censor) === 'object' && typeof(value) == 'object' && censor == value) 
      return '[Circular]'; 
    
    if(i >= 29) 
      return '[Unknown]';
    
    ++i; 
    
    return value;  
  }
}