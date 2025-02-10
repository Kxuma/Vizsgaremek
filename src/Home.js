import React, { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./Navbar";

export default function Home() {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("");
  const [user, setUser] = useState(null); // A bejelentkezett felhasználó

  useEffect(() => {
    const savedComments = JSON.parse(localStorage.getItem("comments")) || [];
    setComments(savedComments);
  }, []);

  // Kommentek eltárolása localstorage-ba
  useEffect(() => {
    localStorage.setItem("comments", JSON.stringify(comments));
  }, [comments]);

  // Localstorage ürítése, ha szükséges
  // localStorage.clean()

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) setUser(savedUser);
  }, []);

  const handleAddComment = () => {
    if (newComment.trim() === "") {
      alert("Nem küldhetsz üres hozzászólást!");
      return;
    }
    const newEntry = { text: newComment.trim(), author: user || "Vendég" };
    setComments([...comments, newEntry]);
    setNewComment("");
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

      <div className="content">
        <h1>{selectedTopic || "Fórum"}</h1>

        {/* Ha a felhasználó be van jelentkezve */}
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
            <ul>
              {comments.map((comment, index) => (
                <li key={index} className="comment">
                  <strong>{comment.author}:</strong> {comment.text}
                </li>
              ))}
            </ul>
          )}
        </ul>
      </div>
    </div>
  );
}
