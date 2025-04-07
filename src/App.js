import React, { useEffect, useState } from 'react';
import './App.css';
import Home from './Home';
import Feltetelek from './Feltetelek';
import { Route, Routes } from 'react-router-dom';
import UjTema from './UjTema';
import axios from 'axios';
import Admin from './Admin';
import Navbar from './Navbar';
import Gyik from './Gyik';
import Profil from './Profil';

function App() {

  const [topics, setTopics] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState(null);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setIsLoggedIn(true);
    }
  }, []);

  const fetchTopics = () => {

    axios.get("https://localhost:7260/api/Topic/Get")
      .then((response) => {
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
      
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} onSelectTopic={handleTopicSelect} topics={topics}/>

        <Routes>
          <Route path="/" element={<Home isLoggedIn={isLoggedIn} selectedTopic={selectedTopic} topics={topics}/>}/>
          <Route path="/UjTema" element={<UjTema topics={topics} fetchTopics={fetchTopics} isLoggedIn={isLoggedIn} />}/>
          <Route path="/Feltetelek" element={<Feltetelek/>}/>
          <Route path="/Admin" element={<Admin topics={topics} setTopics={setTopics}/>}/>
          <Route path="/gyik" element={<Gyik/>}/>
          <Route path="/profil" element={<Profil  topics={topics} />} />
        </Routes>
    </div>
  );
}

export default App;
