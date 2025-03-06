import React, { useState } from "react";
import "./Navbar.css";
import Auth from "./Auth"; // Auth komponens importálása
import { Link, useNavigate } from "react-router-dom";

const Navbar = ({ onSelectTopic }) => {
  const [showAuth, setShowAuth] = useState(false); // Auth űrlap megjelenítése
  const token = localStorage.getItem("token");

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/")
  }

  return (
    <div>
      <nav className="navbar">
        <div className="navbar-left">
          {/* Témák legördülő menüje */}
          <img id="imgNyul" src="/nyul.ico" alt="LogokKep" />
          <select onChange={(e) => onSelectTopic(e.target.value)} defaultValue="">
            <option value="" disabled>
              Válassz témát
            </option>
            <option value="0">React</option>
            <option value="1">JavaScript</option>
            <option value="2">CSS</option>
          </select>
          <Link to='/UjTema' className='btn btn-sm btn-outline-secondary'>
            Új téma létrehozása
          </Link>
        </div>

        <div className="navbar-right">

          {/* 
          Ezzel majd akkor vissza lehet decode és a nevet meg lehet jeleníteni
          {localStorage.getItem("token")}
          */}



          
          {/* Bejelentkezés / Regisztráció gombok */}
          {token ? <button className="loginBtn" onClick={handleLogout}>Kijelentkezés</button> : (
            <button className="loginBtn" onClick={() => setShowAuth(true)}>
              Bejelentkezés / Regisztráció
            </button>
            )
          }
        </div>

        {/* Auth komponens */}

      </nav>
      
      {showAuth && (
        <div>
          <div
            className="auth-overlay"
            onClick={() => setShowAuth(false)}
          ></div>
          <Auth onClose={() => setShowAuth(false)} />
        </div>
      )}
    </div>
  );
};


export default Navbar;
