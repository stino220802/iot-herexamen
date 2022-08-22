import React, { useEffect, useState } from "react"
import axios from 'axios'
import { useNavigate } from "react-router-dom";



export default function (props) {
    let [authMode, setAuthMode] = useState("signin")
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [user, setUser] = useState()
    const [errorMessage, setErrorMessage] = useState('')
    let navigate = useNavigate();
    useEffect(() => {
       
        const loggedInUser = localStorage.getItem("userInfo");
        if (loggedInUser) {
          const foundUser = JSON.parse(loggedInUser);
          setUser(foundUser);
            navigate("/mainpage");
        }
      }, []);

    const changeAuthMode = () => {
      setAuthMode(authMode === "signin" ? "signup" : "signin")
    }

    const handleSubmit2 = async (event) => {
        event.preventDefault();
        try{
            
       
            const config = {
                headers: {
                    "Content-type": "application/json"
                }
            }
            const {data} = await axios.post('/api/users',{
                username, email, password
            }, config);
            console.log(data);
            setUser(data);
            localStorage.setItem("userInfo", JSON.stringify(data)); 
            navigate("/mainpage")
        }
        catch(error){
           
            console.log(error);

        }
    };

  
    const handleSubmit = async (event) => {
        event.preventDefault();
        
        try{
            console.log(email.length);
            if(email.length > 4 || password.length > 4){
            const config = {
                headers: {
                    "Content-type": "application/json"
                }
            }
            console.log("submit working")
            const {data} = await axios.post('/api/users/login',{
                email, password
            }, config);
            setUser(data);
            
            localStorage.setItem("userInfo", JSON.stringify(data)); 
            console.log(data);
            navigate("/mainpage")
        }
        else{
            setErrorMessage('Email or password length are invalid!');
            throw new Error("email or password length are not valid"); 
        }

        }
        catch(error){
            setErrorMessage('Email or password are invalid!');
            console.log(error);
        }
    };


    if (authMode === "signin") {
      return (
        <div className="Auth-form-container">
            
          <form className="Auth-form" onSubmit={handleSubmit}>
            <div className="Auth-form-content">
              <h3 className="Auth-form-title">Sign In</h3>
              <div className="text-center">
                Not registered yet?{" "}
                <span className="link-primary" onClick={changeAuthMode}>
                  Sign Up
                </span>
              </div>
              <div className="form-group mt-3">
                <label>Email address</label>
                <input
                  type="email"
                  value={email}
                  className="form-control mt-1"
                  placeholder="Enter email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="form-group mt-3">
                <label>Password</label>
                <input
                  type="password"
                  value={password}
                  className="form-control mt-1"
                  placeholder="Enter password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="d-grid gap-2 mt-3">
                <input type="submit"/>
              </div>
              {errorMessage && (
  <p className="error"> {errorMessage} </p>
)}
            </div>
          </form>
        </div>
      )
    }
  
    return (
      <div className="Auth-form-container">
        <form className="Auth-form" onSubmit={handleSubmit2}>
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Sign Up</h3>
            <div className="text-center">
              Already registered?{" "}
              <span className="link-primary" onClick={changeAuthMode}>
                Sign In
              </span>
            </div>
            <div className="form-group mt-3">
              <label>Username</label>
              <input
                type="name"
                value = {username}
                className="form-control mt-1"
                placeholder="Enter Username"
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="form-group mt-3">
              <label>Email address</label>
              <input
                type="email"
                value = {email}
                className="form-control mt-1"
                placeholder="Enter Email Address"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group mt-3">
              <label>Password</label>
              <input
                type="password"
                value = {password}
                className="form-control mt-1"
                placeholder="Enter Password"
                onChange={(e) => setPassword(e.target.value)}
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
