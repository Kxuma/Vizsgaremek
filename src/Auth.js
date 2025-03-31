import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Auth.css';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const Auth = ({ onClose, setIsLoggedIn }) => {
  const [currentForm, setCurrentForm] = useState(null);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate()

  // Regisztrációs adatokat küldő függvény
  const handleRegister = (e) => {
    e.preventDefault();
    setError('');

    // Ellenőrzés: minden mező ki van töltve
    if (!email || !username || !password || !confirmPassword) {
      setError('Minden mezőt ki kell tölteni!');
      return;
    }

    // Ellenőrzés: a két jelszó egyezik-e
    if (password !== confirmPassword) {
      setError('A két jelszó nem egyezik!');
      return;
    }

    // Ellenőrzés: a felhasználói feltételek elfogadása
    if (!acceptTerms) {
      setError('El kell fogadni a felhasználói feltételeket!');
      return;
    }

    // Regisztrációs kérés küldése a backend API-ra
    const newUser = {
      email,
      username,
      password,
    };

    axios.post("https://localhost:7260/api/Users/Register", newUser, {
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then((response) => {
        alert('Sikeres regisztráció! Most jelentkezz be.');
        setCurrentForm('login'); // A regisztráció után a bejelentkezés formra váltunk
      })
      .catch((error) => {
        setError(error.response?.data?.message || 'Hiba történt a regisztráció során'); // Hibakezelés
      });
  };

  // Bejelentkezési függvény (példaként)
  const handleLogin = (e) => {
    e.preventDefault();
    setError('');

    if (!username || !password) {
      setError('Minden mezőt ki kell tölteni!');
      return;
    }

    let user = {
      userName: username,
      password: password
    }

    axios.post("https://localhost:7260/api/Users/Login", user)
      .then((response) => {
        console.log(response.data);
        localStorage.setItem("username", response.data.result.userName);
        localStorage.setItem("token", response.data.token);
        console.log(jwtDecode((response.data.token)).sub);
        localStorage.setItem("role", jwtDecode((response.data.token)).role);
        localStorage.setItem("userId", jwtDecode((response.data.token)).sub);
        setIsLoggedIn(true);
        onClose();
      })
      .catch((error) => {
        console.error("Hiba történt a bejelentkezés során:", error.response?.data?.message || error.message);
      });

    
    setCurrentForm(null);
  };

  // Formok váltása (login / register)
  const switchForm = (form) => {
    setCurrentForm(form);
    setEmail('');
    setUsername('');
    setPassword('');
    setConfirmPassword('');
    setAcceptTerms(false);
    setError('');
  };

  return (
    <div className="auth-container">
      {error && <p className="error-message">{error}</p>}

      {currentForm === null && (
        <div className="auth-buttons">
          <button onClick={() => switchForm('login')}>Bejelentkezés</button>
          <button onClick={() => switchForm('register')}>Regisztráció</button>
        </div>
      )}

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
          <button type="button" onClick={() => setCurrentForm(null)}>Mégsem</button>
        </form>
      )}

      {currentForm === 'register' && (
        <form onSubmit={handleRegister}>
          <input
            type="email"
            placeholder="E-mail cím"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
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
          <input
            type="password"
            placeholder="Jelszó ismét"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          {/* ✅ Checkbox a felhasználói feltételekhez */}
          <div className="terms-container">
            <input
              type="checkbox"
              id="acceptTerms"
              checked={acceptTerms}
              onChange={(e) => setAcceptTerms(e.target.checked)}
            />
            <label htmlFor="acceptTerms">
              Elfogadom a{' '}
              <Link to="/Feltetelek" target="_blank" rel="noopener noreferrer">
                felhasználói feltételeket
              </Link>
            </label>
          </div>

          <button type="submit">Regisztráció</button>
          <button type="button" onClick={() => setCurrentForm(null)}>Mégsem</button>
        </form>
      )}

      <button className="close-button" onClick={onClose}>X</button>
    </div>
  );
};

export default Auth;
