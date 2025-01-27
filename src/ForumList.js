import React from 'react';

const ForumList = ({ forums }) => {
  return (
    <div>
      <h2>Fórumok</h2>
      <ul>
        {forums.map((forum, index) => (
          <li key={index}>
            <a href={`/forum/${forum.id}`}>{forum.title}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ForumList;
