// Feltetelek.js
import React, { useState } from 'react';
import './Feltetelek.css';  // Importáljuk a CSS fájlt

const Feltetelek = () => {
  // State a lenyitható szekciók kezeléséhez
  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (index) => {
    // Ha ugyanarra a szekcióra kattintunk, bezárjuk
    if (openSection === index) {
      setOpenSection(null);
    } else {
      setOpenSection(index);
    }
  };

  return (
    <div className="feltetelek-container">
      <h1 className="feltetelek-title">Felhasználói Feltételek</h1>
      <p className="feltetelek-description">
        Üdvözlünk! Itt találhatóak a felhasználói feltételek, amelyeket kérünk, hogy olvass el.
        A továbbiakban tájékoztatunk a szolgáltatásaink használatáról.
      </p>

      <ul className="feltetelek-list">
        {/* 1. Részvételi feltételek */}
        <li>
          <button 
            className="section-toggle" 
            onClick={() => toggleSection(1)}>
            1. Részvételi feltételek
          </button>
          {openSection === 1 && (
            <div className="section-content">
              <p>A részvételi feltételek ismertetése...</p>
            </div>
          )}
        </li>

        {/* 2. Jogi nyilatkozatok */}
        <li>
          <button 
            className="section-toggle" 
            onClick={() => toggleSection(2)}>
            2. Jogi nyilatkozatok
          </button>
          {openSection === 2 && (
            <div className="section-content">
              <p>A jogi nyilatkozatok tartalma...</p>
            </div>
          )}
        </li>

        {/* 3. Adatvédelmi irányelvek */}
        <li>
          <button 
            className="section-toggle" 
            onClick={() => toggleSection(3)}>
            3. Adatvédelmi irányelvek
          </button>
          {openSection === 3 && (
            <div className="section-content">
              <p>Az adatvédelmi irányelvek...</p>
            </div>
          )}
        </li>

        {/* 4. A felelősség kizárása */}
        <li>
          <button 
            className="section-toggle" 
            onClick={() => toggleSection(4)}>
            4. A felelősség kizárása
          </button>
          {openSection === 4 && (
            <div className="section-content">
              <p>A felelősség kizárásának feltételei...</p>
            </div>
          )}
        </li>
      </ul>

      <a href="/" className="back-button">Vissza a kezdőlapra</a>
    </div>
  );
};

export default Feltetelek;
