const asynchandler = require('express-async-handler'); 
const { postDataFuture_proof, postDataLastknown, deleteFromLastknown, getDataFuture_proof } = require('./database.js');
const database = require("./database.js"); 


const fromSensor = asynchandler(async(req, res) => {
      const {sensor_id, name, value} = req.body; 
      var ip = req.headers['x-forwarded-for'] ||
      req.socket.remoteAddress ||
      null;
      
      const futureproof = await postDataFuture_proof(sensor_id, value);
      const t = await deleteFromLastknown(sensor_id);
      const lastknown = await postDataLastknown(sensor_id, value, ip); 
      if(futureproof && lastknown){
        res.status(201).json({
            id: sensor_id,
        });
      }
      else{
        res.status(400); 
        throw new Error("something went wrong");
      }
}); 

const formPage = asynchandler(async(req, res) =>{
    const {sensor_id, name, value} = req.body;
    const future_proof = await postDataFuture_proof(sensor_id, value); 
    if(future_proof){
        res.status(201).json({
            id: sensor_id,
        });
        console.log("werkt");
    }
    else{
        res.status(400); 
        throw new Error("something went wrong");
      }
});

const getData = asynchandler(async(req, res)=>{
  const {data} = req.body; 
    var result = []; 
    const dbData = await getDataFuture_proof();
    for(i = 0; i < dbData.length; i++){
      result.push({sensor_id: dbData[i].sensor_id, value: dbData[i].value, created_at: dbData[i].created_at}); 
    }

    console.log(result); 
    res.json({
      result,}
    );
    console.log("res");
  
});
module.exports = { fromSensor, formPage, getData }; 