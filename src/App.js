import React, { useState } from 'react';
import './App.css';
import Navbar from './Navbar';

function App() {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('');
  const [user, setUser] = useState(null); // A bejelentkezett felhasználó

  const handleAddComment = () => {
    if (newComment.trim() !== '') {
      setComments([...comments, newComment]);
      setNewComment('');
    }
  };

  const handleTopicSelect = (topic) => {
    setSelectedTopic(topic);
  };

  // Bejelentkezés kezelése
  const handleLogin = (username) => {
    setUser(username);  // A bejelentkezett felhasználó nevét tároljuk
  };

  // Regisztráció kezelése
  const handleRegister = (username) => {
    setUser(username);  // A regisztrált felhasználó nevét tároljuk
  };

  return (
    <div className="App">
      <Navbar onSelectTopic={handleTopicSelect} />
      
      <div className="content">
        <h1>{selectedTopic || 'Fórum'}</h1>

        {/* Ha a felhasználó be van jelentkezve */}
        {user ? (
          <p>Üdvözlünk, {user}!</p>
        ) : (
          <p>Nem vagy bejelentkezve</p>
        )}

        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Írd ide a hozzászólásodat..."
          rows="4"
          cols="50"
        />
        <br />
        <button onClick={handleAddComment}>Hozzászólás</button>

        <h2>Hozzászólások:</h2>
        <ul>
          {comments.map((comment, index) => (
            <li key={index}>{comment}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
