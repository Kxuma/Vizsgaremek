import React, { useEffect, useState } from 'react';
import './App.css';
import Home from './Home';
import Feltetelek from './Feltetelek';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import UjTema from './UjTema';
import axios from 'axios';
import Admin from './Admin';
import Navbar from './Navbar';
function App() {

  const [topics, setTopics] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState(null);

  const token = localStorage.getItem("token");

    useEffect(() => {
      if (token) {
        setIsLoggedIn(true);
      }
    }, [token]);

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

  
  const handleTopicSelect = (topic) => {
    console.log(topic);
    if (topic !== selectedTopic) {
      setSelectedTopic(topic);
    }
  };
  

  return (
    <div className="App">
      
      <Navbar setIsLoggedIn={setIsLoggedIn} onSelectTopic={handleTopicSelect} topics={topics}/>

        <Routes>
          <Route path="/" element={<Home isLoggedIn={isLoggedIn} selectedTopic={selectedTopic} topics={topics}/>}/>
          <Route path="/UjTema" element={<UjTema topics={topics} fetchTopics={fetchTopics} isLoggedIn={isLoggedIn} />}/>
          <Route path="/Feltetelek" element={<Feltetelek/>}/>
          <Route path="/Admin" element={<Admin isLoggedIn={isLoggedIn}/>}/>
        </Routes>
    </div>
  );
}

export default App;
