import React from 'react'

export default function Gyik() {
    const faq = [
        {
          question: "Hogyan tudok hozzászólást írni?",
          answer: "Először be kell jelentkezned a jobb felső sarokban. Ezután bármelyik témához írhatsz hozzászólást."
        },
        {
          question: "Hogyan tudok új témát létrehozni?",
          answer: "Bejelentkezés után a navigációs sávban kattints az 'Új téma létrehozása' gombra, majd töltsd ki az űrlapot."
        },
        {
          question: "Mi az a 'profilom' oldal?",
          answer: "A profil oldalon megtekintheted saját hozzászólásaidat és módosíthatod az adataidat (ha ez be van vezetve)."
        },
        {
          question: "Admin vagyok, mit tehetek?",
          answer: "Admin jogosultsággal törölhetsz vagy módosíthatsz témákat és hozzászólásokat, más felhasználók tartalmát is."
        },
        {
          question: "Hogyan vehetem fel a kapcsolatot az oldal üzemeltetőivel?",
          answer: "Jelenleg a kapcsolatfelvételhez írj egy hozzászólást a 'Technikai kérdések' témában, vagy keress minket a Kapcsolat oldalon (ha van)."
        }
      ];
    
      return (
        <div className="content">
          <h1>Gyakran Ismételt Kérdések</h1>
          {faq.map((item, index) => (
            <div key={index} className="faq-item">
              <h3 className="faq-question">❓ {item.question}</h3>
              <p className="faq-answer">{item.answer}</p>
            </div>
          ))}
        </div>
      );
}
