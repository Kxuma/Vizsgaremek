import React, { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./Navbar";

export default function Home() {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("");
  const [user, setUser] = useState(null); // A bejelentkezett felhasználó

  // Kommentek lekérése a backendből (GET metódus)
  useEffect(() => {
    fetch("https://localhost:7260/api/Comment/Get")  // API kommentek lekérése
      .then((response) => response.json())
      .then((data) => setComments(data))
      .catch((error) => console.error("Error fetching comments:", error));
  }, []);

  // Kommentek hozzáadása a backendbe (POST metódus)
  const handleAddComment = () => {
    if (newComment.trim() === "") {
      alert("Nem küldhetsz üres hozzászólást!");
      return;
    }

    const newEntry = {
      text: newComment.trim(),
      author: user || "Vendég",
      topic: selectedTopic,  // A választott téma
    };

    console.log("Küldött adat:", newEntry);  // Ellenőrzés a konzolban

    fetch("https://localhost:7260/api/Comment/Post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newEntry),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Hiba történt a hozzászólás mentésekor");
        }
        return response.json();  // A válasz JSON formátumban
      })
      .then((data) => {
        console.log("Válasz a POST kérésből:", data);  // Ellenőrzés
        setComments((prevComments) => [...prevComments, data]);  // Frissíti a kommentek listáját
        setNewComment("");  // Üríti a kommentet
      })
      .catch((error) => {
        console.error("Hiba a komment hozzáadásakor:", error);
        alert("Nem sikerült a hozzászólás mentése!");
      });
  };

  // Komment törlése (DELETE metódus)
  const handleDeleteComment = (commentId) => {
    fetch(`https://localhost:7260/api/Comment/Delete?id=${commentId}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          setComments(comments.filter((comment) => comment.id !== commentId));
        } else {
          alert("Hiba történt a komment törlésekor.");
        }
      })
      .catch((error) => console.error("Hiba a komment törlésénél:", error));
  };

  const handleTopicSelect = (topic) => {
    if (topic !== selectedTopic) {
      setSelectedTopic(topic);
    }
  };

  // Bejelentkezés kezelése
  const handleLogin = (username) => {
    setUser(username); // A bejelentkezett felhasználó nevét tároljuk
    localStorage.setItem("user", username);
  };

  // Regisztráció kezelése
  const handleRegister = (username) => {
    setUser(username); // A regisztrált felhasználó nevét tároljuk
    localStorage.setItem("user", username);
  };

  return (
    <div>
      <Navbar onSelectTopic={handleTopicSelect} />

      <div className="content" /*ittvolt eez a fos*/>
        <h1>{selectedTopic || "Fórum"}</h1>

        {user ? <p>Üdvözlünk, {user}!</p> : <p>Nem vagy bejelentkezve</p>}

        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Írd ide a hozzászólásodat..."
          rows="4"
          cols="50"
        />
        <br />
        <button className="commentButton" onClick={handleAddComment}>Hozzászólás</button>

        <h2>Hozzászólások:</h2>
        <ul>
          {comments.length === 0 ? (
            <p>Még nincs hozzászólás. Légy te az első!</p>
          ) : (
            comments.map((comment) => (
              <li key={comment.id} className="comment">
                <strong>{comment.author}:</strong> {comment.text}
                <button
                  onClick={() => handleDeleteComment(comment.id)}
                  style={{ marginLeft: "10px", color: "red" }}
                >
                  Törlés
                </button>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}
