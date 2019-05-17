import React from 'react';
import Todo from './Todo';
import { ReactComponent as Loader } from './Loader.svg';

const Todos = ({ isLoading, todos, user, updatedAt }) => {
  if (!todos && isLoading) {
    return <Loader className="loaderSvg" />;
  }

  if (!user || !todos) {
    return (
      <div>
        <div>Select a user to get started...</div>
      </div>
    );
  }

  return (
    <>
      <div className="columns">
        <h2 className="column title is-spaced">Todos for {user.name}</h2>
        <div className="column is-narrow" style={{ marginTop: '16px' }}>
          {isLoading && 'Checking for updates...'}
        </div>
      </div>
      <p>
        <em>
          Updated at {updatedAt.toDateString()} {updatedAt.toTimeString()}
        </em>
      </p>
      {todos.map(todo => (
        <Todo key={todo.id} todo={todo} />
      ))}
    </>
  );
};

export default Todos;
