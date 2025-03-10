import React, { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./Navbar";

export default function Home() {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("");
  const [userId, setUserId] = useState(null); // A bejelentkezett felhasználó
  const [userName, setUserName] = useState(null); // A bejelentkezett felhasználó
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  let token = null;

  if (isLoggedIn) {
    token = localStorage.getItem("token");
  }


  // Kommentek lekérése a backendből (GET metódus)
  useEffect(() => {
    fetch("https://localhost:7260/api/Comment/Get")
      .then((response) => response.json())
      .then((data) => setComments(data))
      .catch((error) => console.error("Error fetching comments:", error));
  }, [isLoggedIn]);

  // Kommentek hozzáadása a backendbe (POST metódus)
  const handleAddComment = () => {
    if (newComment.trim() === "") {
      alert("Nem küldhetsz üres hozzászólást!");
      return;
    }

    const newEntry = {
      text: newComment.trim(),
      uId: userId || "0",
      tId: Number(selectedTopic),  // A választott téma
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
    console.log(topic);
    if (topic !== selectedTopic) {
      setSelectedTopic(topic);
    }
  };

  // Bejelentkezés kezelése
  const handleLogin = (userId, userName) => {
    setUserId(userId); // A bejelentkezett felhasználó id-ját tároljuk
    setUserName(userName); // A bejelentkezett felhasználó nevét tároljuk
    localStorage.setItem("userId", userId);
    localStorage.setItem("userName", userName);
  };

  // Regisztráció kezelése
  const handleRegister = (userId) => {
    setUserId(userId); // A regisztrált felhasználó nevét tároljuk
    localStorage.setItem("userId", userId);
  };

  return (
    <div>
      <Navbar onSelectTopic={handleTopicSelect} setIsLoggedIn={setIsLoggedIn} />

      <div className="content" >
        <h1>{selectedTopic === "0" ? "React" : selectedTopic === "1" ? "JavaScript" : selectedTopic === "2" ? "CSS" : "Fórum"}</h1>

        {userName ? <p>Üdvözlünk, {userName}!</p> : <p>Nem vagy bejelentkezve</p>}

        {isLoggedIn ?
          <div>
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Írd ide a hozzászólásodat..."
              rows="4"
              cols="50"
            />
            <br />
            <button className="commentButton" onClick={handleAddComment}>Hozzászólás</button>
          </div>
          : <p>Addig nem tudsz hozzászólást írni amíg nem vagy bejelentkezve!</p>}

        <h2>Hozzászólások:</h2>
        <ul>
          {comments.length === 0 ? (
            <p>Még nincs hozzászólás. Légy te az első!</p>
          ) : (
            comments.map((comment) => (
              <li key={comment.id} className="comment">
                <strong>{comment.author}:</strong> {comment.text}
                <button className="KukaIcon"
                  onClick={() => handleDeleteComment(comment.id)}
                  style={{ marginLeft: "10px", color: "red" }}
                >
                   <svg  xmlns="http://www.w3.org/2000/svg" width="16" height="16"  fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
                    <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0" />
                  </svg>
                </button>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}
