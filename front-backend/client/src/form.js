import React, { useEffect, useState } from "react"
import axios from 'axios'
import { useNavigate } from "react-router-dom";

export default function (props) {

    const [sensor_id, setSensorId] = useState("")
    const [value, setValue] = useState("")
    const [user, setUser] = useState()
    const [errorMessage, setErrorMessage] = useState('')



    const handleSubmit = async (event) => {
        event.preventDefault();
        
        try{
           
            const config = {
                headers: {
                    "Content-type": "application/json"
                }
            }
            
            const {data} = await axios.post('/api/users/formData',{
                sensor_id, value
            }, config);
            
           
        }

        catch(error){
            setErrorMessage('Email or password are invalid!');
            console.log(error);
        }
    };

    return (
        <div className="Auth-form-container">
          <form className="Auth-form" onSubmit={handleSubmit}>
            <div className="Auth-form-content">
              <h3 className="Auth-form-title">Sign Up</h3>
              <div className="text-center">
              </div>
              <div className="form-group mt-3">
                <label>sensor_id</label>
                <input
                  type="sensor_id"
                  value = {sensor_id}
                  className="form-control mt-1"
                  placeholder="Enter sensor_id"
                  onChange={(e) => setSensorId(e.target.value)}
                />
              </div>
              <div className="form-group mt-3">
                <label>value</label>
                <input
                  type="value"
                  value = {value}
                  className="form-control mt-1"
                  placeholder="Enter value"
                  onChange={(e) => setValue(e.target.value)}
                />
              </div>
    
              <div className="d-grid gap-2 mt-3">
                  <input type="submit"/>
              </div>
  
            </div>
          </form>
        </div>
      )
}