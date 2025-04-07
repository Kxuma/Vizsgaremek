import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
 

export default function UjTema({topics, fetchTopics, isLoggedIn}) {
  const [topicName, setTopicName] = useState("");
  const [description, setDescription] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if(!isLoggedIn) {
      navigate("/")
    }
  
  }, [isLoggedIn])
  
  

  // Téma létrehozásának kezelése
  const handleCreateTopic = () => {

    setErrorMessage("");
    setSuccessMessage("");

    const existing = topics.find(topic => topic.title.toLowerCase().trim() === topicName.toLowerCase().trim());

    if (existing) {
      setErrorMessage("Már létezik ilyen nevű téma!");
      return;
    }

    if (topicName.trim() === "" || description.trim() === "") {
      setErrorMessage("Minden mező kitöltése kötelező!");
      return;
    }

    // Itt végzi el a tényleges téma létrehozását
    console.log("Új téma neve:", topicName);
    console.log("Téma leírása:", description);

    const topic = {
      title: topicName,
      description: description,
      uid: userId
    }

    console.log(topic);

    axios.post(`${process.env.REACT_APP_BASE_URL}/api/Topic/Post`, topic)
    .then(() => {
      setTopicName("");
      setDescription("");
      setSuccessMessage("Új téma sikeresen létrejött!");
      fetchTopics();
    })
    .catch((error) => {
      setErrorMessage("Hiba történt a téma létrehozásakor.");
      console.error("Hiba a küldéskor: ", error);
    })
  };

  return (
    <div>
      
      <div className="content">
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
        {errorMessage && <p className="error-message pt-3">{errorMessage}</p>}
        {successMessage && <p className="success-message pt-3">{successMessage}</p>}
      </div>
    </div>
  );
}
