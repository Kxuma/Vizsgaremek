import React, { useState } from 'react';
import './Auth.css';

const Auth = ({ onLogin, onRegister, onClose }) => {
  const [currentForm, setCurrentForm] = useState(null); // Kezdetben nincs kiválasztott forma
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (username && password) {
      onLogin(username);  // Bejelentkezés
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (username && password) {
      onRegister(username);  // Regisztráció
    }
  };

  return (
    <div className="auth-container">
      {/* Alapértelmezett gombok a bejelentkezéshez és regisztrációhoz */}
      {currentForm === null && (
        <div className="auth-buttons">
          <button onClick={() => setCurrentForm('login')}>Bejelentkezés</button>
          <button onClick={() => setCurrentForm('register')}>Regisztráció</button>
        </div>
      )}

      {/* Bejelentkezés űrlap */}
      {currentForm === 'login' && (
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Felhasználónév"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Jelszó"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Bejelentkezés</button>
          <button type="button" onClick={() => setCurrentForm(null)}>Mégsem</button>  {/* Vissza */}
        </form>
      )}

      {/* Regisztrációs űrlap */}
      {currentForm === 'register' && (
        <form onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Felhasználónév"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Jelszó"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Regisztráció</button>
          <button type="button" onClick={() => setCurrentForm(null)}>Mégsem</button>  {/* Vissza */}
        </form>
      )}

      {/* Zárás gomb */}
      <button className="close-button" onClick={onClose}>X</button>
    </div>
  );
};

export default Auth;
