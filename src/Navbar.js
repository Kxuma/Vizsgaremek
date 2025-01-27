import React, { useState } from 'react';
import './Navbar.css';
import Auth from './Auth';  // Auth komponens importálása

const Navbar = ({ onSelectTopic }) => {
  const [showAuth, setShowAuth] = useState(false); // Auth űrlap megjelenítése

  return (
    <nav className="navbar">
      <div className="navbar-left">
        {/* Témák legördülő menüje */}
        <img id='imgNyul' src="nyul.ico" alt="LogokKep" />
        <select onChange={(e) => onSelectTopic(e.target.value)} defaultValue="">
          <option value="" disabled>Válassz témát</option>
          <option value="React">React</option>
          <option value="JavaScript">JavaScript</option>
          <option value="CSS">CSS</option>
        </select>
      </div>

      <div className="navbar-right">
        {/* Bejelentkezés / Regisztráció gombok */}
        <button onClick={() => setShowAuth(true)}>Bejelentkezés / Regisztráció</button>
      </div>

      {/* Auth komponens */}
      {showAuth && <Auth onClose={() => setShowAuth(false)} />}
    </nav>
  );
};

export default Navbar;
