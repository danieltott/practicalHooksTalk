import React from 'react';
import Todo from './Todo';
import { Pane, Text, Heading, Spinner, majorScale } from 'evergreen-ui';
import { Paragraph } from 'evergreen-ui/commonjs/typography';

const Todos = ({ isLoading, todos, user, updatedAt, error }) => {
  if (error) {
    return <div>{error.message}</div>;
  }
  if (!todos && isLoading) {
    return <Spinner size={majorScale(4)} />;
  }

  if (!user || !todos) {
    return (
      <Pane>
        <Text color="muted" is="em">
          Select a user to get started...
        </Text>
      </Pane>
    );
  }

  return (
    <>
      <Pane display="flex" alignItems="center">
        <Heading flex={1} size={700}>
          Todos for {user.name}
        </Heading>
        {isLoading && <Spinner size={majorScale(2)} />}
      </Pane>
      <Paragraph marginBottom="2em">
        <Text is="em" color="muted">
          Updated at {updatedAt.toDateString()} {updatedAt.toTimeString()}
        </Text>
      </Paragraph>
      {todos.map(todo => (
        <Todo key={todo.id} todo={todo} />
      ))}
    </>
  );
};

export default Todos;
