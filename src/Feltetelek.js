// Feltetelek.js
import React, { useState } from 'react';
import './Feltetelek.css';  // Importáljuk a CSS fájlt
import { Link } from 'react-router-dom';

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
        <li className='felsorolas'>
          <button 
            className="section-toggle" 
            onClick={() => toggleSection(1)}>
            1. Részvételi feltételek
          </button>
          {openSection === 1 && (
            <div>
              <p className="section-content">Légy tisztelettudó! Tilos a spam, a gyűlöletbeszéd és az illegális tartalom. A moderátorok döntése végleges.</p>
            </div>
          )}
        </li>

        {/* 2. Jogi nyilatkozatok */}
        <li className='felsorolas'>
          <button 
            className="section-toggle" 
            onClick={() => toggleSection(2)}>
            2. Jogi nyilatkozatok
          </button>
          {openSection === 2 && (
            <div>
              <p className="section-content">A fórum tartalmát a felhasználók hozzák létre, ezért nem vállalunk felelősséget a bejegyzések pontosságáért vagy jogszerűségéért.</p>
            </div>
          )}
        </li>

        {/* 3. Adatvédelmi irányelvek */}
        <li className='felsorolas'>
          <button 
            className="section-toggle" 
            onClick={() => toggleSection(3)}>
            3. Adatvédelmi irányelvek
          </button>
          {openSection === 3 && (
            <div>
              <p className="section-content">A fórum sütiket és alapvető adatokat használ a működéshez. Nem adjuk el az adataidat harmadik félnek.</p>
            </div>
          )}
        </li>

        {/* 4. A felelősség kizárása */}
        <li className='felsorolas'>
          <button 
            className="section-toggle" 
            onClick={() => toggleSection(4)}>
            4. A felelősség kizárása
          </button>
          {openSection === 4 && (
            <div>
              <p className="section-content">A fórum használata saját felelősségre történik. Nem vállalunk felelősséget semmilyen káreseményért vagy problémáért, ami a használatból fakadhat.

</p>
            </div>
          )}
        </li>
      </ul>

      <Link to={"/"}  className="back-button">Vissza a kezdőlapra</Link>
    </div>
  );
};

export default Feltetelek;
