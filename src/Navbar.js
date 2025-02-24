import React, { useState } from "react";
import "./Navbar.css";
import Auth from "./Auth"; // Auth komponens importálása
import { Link } from "react-router-dom";

const Navbar = ({ onSelectTopic }) => {
  const [showAuth, setShowAuth] = useState(false); // Auth űrlap megjelenítése

  return (
    <nav className="navbar">
      <div className="navbar-left">
        {/* Témák legördülő menüje */}
        <img id="imgNyul" src="/nyul.ico" alt="LogokKep" />
        <select onChange={(e) => onSelectTopic(e.target.value)} defaultValue="">
          <option value="" disabled>
            Válassz témát
          </option>
          <option value="React">React</option>
          <option value="JavaScript">JavaScript</option>
          <option value="CSS">CSS</option>
        </select>
          <Link to='/UjTema' className='btn btn-sm btn-outline-secondary'>
            Új téma létrehozása
          </Link>
      </div>

      <div className="navbar-right">
        {/* Bejelentkezés / Regisztráció gombok */}
        <button className="loginBtn" onClick={() => setShowAuth(true)}>
          Bejelentkezés / Regisztráció
        </button>
      </div>

      {/* Auth komponens */}
      {showAuth && (
        <div>
          <div
            className="auth-overlay"
            onClick={() => setShowAuth(false)}
          ></div>
          <Auth onClose={() => setShowAuth(false)} />
        </div>
      )}
    </nav>
  );
};


export default Navbar;
