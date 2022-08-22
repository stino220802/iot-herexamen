import "bootstrap/dist/css/bootstrap.min.css"
import logo from './logo.svg';
import './App.css';
import {useState} from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Auth from "./auth"
import Mainpage from "./mainpage"
import Chart from "./chart"
import Form from "./form"
import Table from "./table"
import Rss from "./rssfeed"

function App() {
  const [search, setSearch] = useState("");
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/mainpage" element= {<Mainpage/>}/>
        <Route path="/table" element= {<Table/>}/>
        <Route path="/chart" element = {<Chart/>}/>
        <Route path="/form" element = {<Form/>}/>
        <Route path="/rssfeed" element = {<Rss/>}/>

      </Routes>
    </BrowserRouter>
  )
}

export default App;

/*
function App() {
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>{!data ? "Loading..." : data}</p>
      </header>
    </div>
  );
}

export default App;*/