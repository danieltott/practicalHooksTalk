import React from 'react';

const Todo = ({ todo }) => {
  return (
    <div className="box">
      <p
        className="subtitle"
        style={{
          textDecoration: todo.completed ? 'line-through' : 'normal'
        }}
      >
        {todo.title}
      </p>
    </div>
  );
};

export default Todo;
