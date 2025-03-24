import React, { useEffect, useState } from 'react';
import './App.css';
import Home from './Home';
import Feltetelek from './Feltetelek';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import UjTema from './UjTema';
import axios from 'axios';

function App() {

  const [topics, setTopics] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const fetchTopics = () => {

    axios.get("https://localhost:7260/api/Topic/Get")
      .then((response) => {
        console.log(response.data);
        setTopics(response.data);
    })
    .catch((error) => console.error("Error fetching topics:", error));

  };

  useEffect(() => {
    fetchTopics()
  
  }, [])
  

  return (
    <div className="App">
      

        <Routes>
          <Route path="/" element={<Home isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} topics={topics}/>}/>
          <Route path="/UjTema" element={<UjTema topics={topics} fetchTopics={fetchTopics}/>}/>
          <Route path="/Feltetelek" element={<Feltetelek/>}/>
        </Routes>
    </div>
  );
}

export default App;
