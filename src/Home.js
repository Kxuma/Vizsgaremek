import React, { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./Navbar";
import axios from "axios";

export default function Home({selectedTopic, isLoggedIn, topics}) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [selectedTopicData, setSelectedTopicData] = useState({title: "", id: ""});

  const userId = localStorage.getItem("userId");
  const userName = localStorage.getItem("username");
  const token = localStorage.getItem("token");

  console.log(comments);
  

  useEffect(() => {
    setSelectedTopicData({
      title: !selectedTopic ? "Fórum" : topics.find((topic) => topic.id == selectedTopic).title,
      id: !selectedTopic ? "0" : topics.find((topic) => topic.id == selectedTopic).id
    })

    GetComments();
  }, [selectedTopic])

  // Kommentek lekérése a backendből (GET metódus)
  function GetComments() {
    fetch("https://localhost:7260/api/Comment/Get")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        
        const filteredComments = data.filter((comment) => comment.tId == selectedTopicData.id)
        setComments(filteredComments);
      })
      .catch((error) => console.error("Error fetching comments:", error));
  }

  // Kommentek hozzáadása a backendbe (POST metódus)
  const handleAddComment = () => {
    if (newComment.trim() === "") {
      alert("Nem küldhetsz üres hozzászólást!");
      return;
    }

    const newEntry = {
      text: newComment.trim(),
      uId: userId || "0",
      tId: Number(selectedTopicData.id),  // A választott téma
    };

    console.log("Küldött adat:", newEntry);  // Ellenőrzés a konzolban

    axios.post("https://localhost:7260/api/Comment/Post", newEntry)
      .then((response) => {
        console.log("Válasz a POST kérésből:", response.data); // Ellenőrzés
        setComments((prevComments) => [...prevComments, response.data]); // Frissíti a kommentek listáját
        setNewComment(""); // Üríti a kommentet
      })
      .catch((error) => {
        console.error("Hiba a komment hozzáadásakor:", error.response?.data?.message || error.message);
        alert("Nem sikerült a hozzászólás mentése!");
      });
  };

  // Komment törlése (DELETE metódus)
  const handleDeleteComment = (commentId) => {
    axios.delete(`https://localhost:7260/api/Comment/Delete`, {
      params: { id: commentId } // Paraméter átadása
    })
      .then((response) => {
        if (response.status === 200) {
          setComments((prevComments) => prevComments.filter((comment) => comment.id !== commentId));
        } else {
          alert("Hiba történt a komment törlésekor.");
        }
      })
      .catch((error) => console.error("Hiba a komment törlésénél:", error.response?.data?.message || error.message));
  };


  return (
    <div>

      <div className="content" >
        <h1>{selectedTopicData.title}</h1>

        {isLoggedIn ? <p>Üdvözlünk, {userName}!</p> : <p>Nem vagy bejelentkezve</p>}

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
