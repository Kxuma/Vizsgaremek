import React, { useState } from "react";
import "./Navbar.css";
import Auth from "./Auth";
import { Link, NavLink, useNavigate } from "react-router-dom";

const Navbar = ({ onSelectTopic, topics, setIsLoggedIn, isLoggedIn }) => {
  const [showAuth, setShowAuth] = useState(false);
  const role = localStorage.getItem("role");
  const isAdmin = isLoggedIn && role === "Admin";
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("role");
    localStorage.removeItem("userId");
    setIsLoggedIn(false)
    navigate("/");
  }

  return (
    <div>
      <nav className="navbar">
        <div className="navbar-left">

          <Link to="/">
            <img id="imgNyul" src="/nyul.ico" alt="Logo" />
          </Link>

          {/* Témák legördülő menüje */}
          <select className="topic-select" onChange={(e) => onSelectTopic(e.target.value)} defaultValue="">
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
          {isLoggedIn && (
            <div>
              <NavLink to='/UjTema' className={({ isActive }) => isActive ? 'btn btn-sm topic-select active' : 'btn btn-sm topic-select'}>
                Új téma létrehozása
              </NavLink>
              <NavLink to="/profil" className={({ isActive }) => isActive ? 'btn btn-sm topic-select active' : 'btn btn-sm topic-select'}>
                Profilom
              </NavLink>
            </div>
          )}

          {isAdmin && (
            <NavLink to="/Admin" className={({ isActive }) => isActive ? 'btn btn-sm topic-select active' : 'btn btn-sm topic-select'}>
              Admin felület
            </NavLink>
          )}

          <NavLink to="/gyik" className={({ isActive }) => isActive ? 'btn btn-sm topic-select active' : 'btn btn-sm topic-select'}>
            GYIK
          </NavLink>

        </div>

        <div className="navbar-right">
          {/* Bejelentkezés / Regisztráció gombok */}
          {isLoggedIn ? <button className="loginBtn" onClick={handleLogout}>Kijelentkezés</button> : (
            <button className="loginBtn" onClick={() => { setShowAuth(true) }}>
              Bejelentkezés / Regisztráció
            </button>
          )
          }
        </div>
      </nav>

      {/* Auth komponens */}
      {showAuth && (
        <div>
          <div className="auth-overlay" onClick={() => setShowAuth(false)}></div>
          <Auth setIsLoggedIn={setIsLoggedIn} onClose={() => setShowAuth(false)} />
        </div>
      )}
    </div>
  );
};


export default Navbar;
