import React, { useState } from 'react';
import Navbar from './Navbar';
 

export default function UjTema() {
  const [topicName, setTopicName] = useState("");  // Téma neve
  const [description, setDescription] = useState(""); // Téma leírása

  // Téma létrehozásának kezelése
  const handleCreateTopic = () => {
    if (topicName.trim() === "" || description.trim() === "") {
      alert("Minden mező kitöltése kötelező!");
      return;
    }

    // Itt végzi el a tényleges téma létrehozását
    console.log("Új téma neve:", topicName);
    console.log("Téma leírása:", description);

    // Ezt módosíthatod a téma hozzáadásának logikájával (például API hívás)
    alert("Új téma sikeresen létrejött!");

    // Alapértelmezett értékek ürítése a mezőkben
    setTopicName("");
    setDescription("");
  };

  return (
    <div>
      <Navbar/> 
      
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
