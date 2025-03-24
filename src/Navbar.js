import React, { useEffect, useState } from "react";
import "./Navbar.css";
import Auth from "./Auth"; // Auth komponens importálása
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Navbar = ({ onSelectTopic, topics, setIsLoggedIn }) => {
  const [showAuth, setShowAuth] = useState(false); // Auth űrlap megjelenítése
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  console.log(topics);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setIsLoggedIn(false)
    navigate("/");
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
            {
              topics.map((topic) => (
                <option title={topic.description} key={topic.id} value={topic.id}>
                  {topic.title}
                </option>
              ))
            }
          </select>
          {token ? (
                      <Link to='/UjTema' className='btn btn-sm btn-outline-secondary'>
            Új téma létrehozása
          </Link>
          ) : null}

        </div>

        <div className="navbar-right">

          



          
          {/* Bejelentkezés / Regisztráció gombok */}
          {token ? <button className="loginBtn" onClick={handleLogout}>Kijelentkezés</button> : (
            <button className="loginBtn" onClick={() => {setShowAuth(true)}}>
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
          <Auth setIsLoggedIn={setIsLoggedIn} onClose={() => setShowAuth(false)}/>
        </div>
      )}
    </div>
  );
};


export default Navbar;
