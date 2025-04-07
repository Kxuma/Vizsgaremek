import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

export default function Admin({topics, setTopics}) {
  const [comments, setComments] = useState([]);
  const [editCommentId, setEditCommentId] = useState(null);
  const [editCommentText, setEditCommentText] = useState("");
  const [editTopicId, setEditTopicId] = useState(null);
  const [editTopic, setEditTopic] = useState({ title: "", description: "" });

  const role = localStorage.getItem("role");

  useEffect(() => {
    if (role !== "Admin") return;
    fetchComments();
  }, []);

  const fetchComments = () => {
    axios.get(`${process.env.REACT_APP_BASE_URL}/api/Comment/Get`)
      .then(response => setComments(response.data))
      .catch(error => console.error(error));
  };

  const deleteComment = (id) => {
    axios.delete(`${process.env.REACT_APP_BASE_URL}/api/Comment/Delete?id=${id}`)
      .then(() => setComments(prev => prev.filter(comment => comment.id !== id)))
      .catch(error => console.error(error));
  };

  const deleteTopic = (id) => {
    axios.delete(`${process.env.REACT_APP_BASE_URL}/api/Topic/Delete?id=${id}`)
      .then(() => setTopics(prev => prev.filter(topic => topic.id !== id)))
      .catch(error => console.error(error));
  };

  const startEditComment = (comment) => {
    setEditCommentId(comment.id);
    setEditCommentText(comment.text);
  };

  const saveEditedComment = () => {
    axios.put(`${process.env.REACT_APP_BASE_URL}/api/Comment/${editCommentId}`, {
      text: editCommentText
    }).then(() => {
      setComments(prev =>
        prev.map(comment => comment.id === editCommentId ? { ...comment, text: editCommentText } : comment)
      );
      setEditCommentId(null);
      setEditCommentText("");
    }).catch(error => console.error(error));
  };

  const startEditTopic = (topic) => {
    setEditTopicId(topic.id);
    setEditTopic({ title: topic.title, description: topic.description });
  };

  const saveEditedTopic = () => {
    axios.put(`${process.env.REACT_APP_BASE_URL}/api/Topic/${editTopicId}`, {
      title: editTopic.title,
      description: editTopic.description
    }).then(() => {
      setTopics(prev =>
        prev.map(topic => topic.id === editTopicId ? { ...topic, ...editTopic } : topic)
      );
      setEditTopicId(null);
      setEditTopic({ title: "", description: "" });
    }).catch(error => console.error(error));
  };

  if (role !== "Admin") {
    return <div className="content"><h1>Hozzáférés megtagadva</h1></div>;
  }

  return (
    <div className="content">
      <h1>Admin felület</h1>

      <h2>Témák kezelése</h2>
      {topics.map(topic => (
        <div key={topic.id} className="comment">
          {editTopicId === topic.id ? (
            <>
              <input
                value={editTopic.title}
                onChange={(e) => setEditTopic({ ...editTopic, title: e.target.value })}
              />
              <textarea
                value={editTopic.description}
                onChange={(e) => setEditTopic({ ...editTopic, description: e.target.value })}
              />
              <button onClick={saveEditedTopic} className="commentButton">Mentés</button>
            </>
          ) : (
            <>
              <strong>{topic.title}</strong>
              <p>{topic.description}</p>
              <button onClick={() => startEditTopic(topic)} className="commentButton">Szerkesztés</button>
              <button onClick={() => deleteTopic(topic.id)} className="commentButton" style={{ backgroundColor: "#e40558" }}>Törlés</button>
            </>
          )}
        </div>
      ))}

      <h2>Hozzászólások kezelése</h2>
      {comments.map(comment => (
        <div key={comment.id} className="comment">
          <p><strong>{comment.author}</strong> ({comment.tId})</p>
          {editCommentId === comment.id ? (
            <>
              <textarea
                value={editCommentText}
                onChange={(e) => setEditCommentText(e.target.value)}
              />
              <button onClick={saveEditedComment} className="commentButton">Mentés</button>
            </>
          ) : (
            <>
              <p>{comment.text}</p>
              <button onClick={() => startEditComment(comment)} className="commentButton">Szerkesztés</button>
              <button onClick={() => deleteComment(comment.id)} className="commentButton" style={{ backgroundColor: "#e40558" }}>Törlés</button>
            </>
          )}
        </div>
      ))}
    </div>
  );
}
