import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

export default function Profilom({ topics }) {
  const [comments, setComments] = useState([]);
  const userId = localStorage.getItem("userId");
  const userName = localStorage.getItem("username");

  useEffect(() => {
    fetchUserComments();
  }, []);

  const fetchUserComments = () => {
    axios.get(`${process.env.REACT_APP_BASE_URL}/api/Comment/Get`)
      .then((response) => {
        const userComments = response.data.filter((comment) => comment.uId == userId);
        setComments(userComments);
      })
      .catch((error) => {
        console.error("Hiba a hozzászólások lekérdezésekor:", error);
      });
  };

  // Segédfüggvény a téma nevének meghatározásához
  const getTopicTitle = (topicId) => {
    const topic = topics.find(t => t.id == topicId);
    return topic ? topic.title : "Ismeretlen téma";
  };

  return (
    <div className="content">
      <h1>Profilom</h1>
      <p><strong>Felhasználónév:</strong> {userName}</p>
      <p><strong>Felhasználói azonosító:</strong> {userId}</p>

      <h2>Saját hozzászólásaim:</h2>
      <ul>
        {comments.length === 0 ? (
          <p>Még nem írtál hozzászólást.</p>
        ) : (
          comments.map((comment) => (
            <li key={comment.id} className="profileComment">
              <p><strong>Téma:</strong> {getTopicTitle(comment.tId)}</p>
              <p>{comment.text}</p>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
