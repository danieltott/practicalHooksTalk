import React, { useCallback, useEffect, useRef } from 'react';
import useLoadData from './useLoadData';
import Todo from './Todo';
import Api from './Api';
import { ReactComponent as Loader } from './Loader.svg';

const Todos = ({ user, showCompleted }) => {
  const [
    { isLoading, data: todos, updatedAt, error },
    loadTodos,
    reset
  ] = useLoadData(
    useCallback(() => Api.fetchTodosByUser(user.id, showCompleted), [
      user,
      showCompleted
    ]),
    { runImmediately: false }
  );

  const interval = useRef();

  useEffect(() => {
    if (user) {
      reset();
      loadTodos();
      interval.current = setInterval(() => {
        loadTodos();
      }, 6000);
    }

    return () => {
      clearInterval(interval.current);
    };
  }, [user, loadTodos, reset]);

  useEffect(() => {
    if (error) {
      clearInterval(interval);
    }
  }, [error]);

  if (error) {
    return <div>{error.message}</div>;
  }
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
