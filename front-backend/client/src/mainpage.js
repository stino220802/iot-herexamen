import React, { useEffect, useState, Component } from "react"
import axios from 'axios'
import { BrowserRouter as Router, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";



export default function (props) {
    let navigate = useNavigate();  
    const [joke, setJoke] = useState(null)
    useEffect(() => {
        async function fetchData(){
        const joke = await fetch("https://icanhazdadjoke.com/", {
            headers:{
                'Accept' : 'application/json'
            }
        });
        const joke2 = await joke.json(); 
        console.log(joke2);
        setJoke(joke2); }
        fetchData();
      }, []); 
    useEffect(() => {
       
    const loggedInUser = localStorage.getItem("userInfo");
        if (!loggedInUser) {
            navigate("/");
        }
      }, []);
      const handleSubmit = async (event) => {
        try{
            localStorage.removeItem('userInfo');
            navigate("/")
        }
        catch(error){
            console.log(error);
        }

      };
  
      return (
        <div>

        <Link to="/rssfeed"><button>
          RSS feed
        </button>
        </Link>
        <Link to="/table"><button>
          data table
        </button>
        </Link>
        <Link to="/chart"><button>
          data graph 
        </button>
        </Link>
        <Link to="/form"><button>
          form
        </button>
        </Link>
        <form onSubmit={handleSubmit}>
            <button type="submit">Logout</button>
        </form>
      </div>
      
      
 
      );
    }
  
