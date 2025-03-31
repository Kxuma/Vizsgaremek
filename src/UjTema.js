import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
 

export default function UjTema({topics, fetchTopics, isLoggedIn}) {
  const [topicName, setTopicName] = useState("");  // Téma neve
  const [description, setDescription] = useState(""); // Téma leírása
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if(!isLoggedIn) {
      navigate("/")
    }
  
  }, [isLoggedIn])
  
  

  // Téma létrehozásának kezelése
  const handleCreateTopic = () => {
    if (topicName.trim() === "" || description.trim() === "") {
      alert("Minden mező kitöltése kötelező!");
      return;
    }

    // Itt végzi el a tényleges téma létrehozását
    console.log("Új téma neve:", topicName);
    console.log("Téma leírása:", description);

    const topic = {
      title: topicName,
      description: description,
      uid: jwtDecode(token).sub
    }

    console.log(topic);
    

    axios.post("https://localhost:7260/api/Topic/Post", topic)
    .then(() => {
      alert("Új téma sikeresen létrejött!");
      fetchTopics();
    })
    .catch((error) => {
      console.error("Hiba a küldéskor:", error);
    })

    // Alapértelmezett értékek ürítése a mezőkben
    setTopicName("");
    setDescription("");
  };

  return (
    <div>
      
      <div className="content"/*itt is volt az a fos*/>
        <h1>Új téma létrehozása</h1>
        
        <div >
          <label htmlFor="topicName">Téma neve:</label>
          <br/>
          <input
            type="text"
            id="topicName"
            value={topicName}
            onChange={(e) => setTopicName(e.target.value)}
            placeholder="Add meg a téma nevét"
           
          />
        </div>

        <div>
          <label htmlFor="description">Téma leírása:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Írd le a témát"
            
          />
        </div>

        <button className='commentButton'
          onClick={handleCreateTopic} 
          
          
        >
          Téma létrehozása
        </button>
      </div>
    </div>
  );
}
