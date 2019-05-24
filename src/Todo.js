import React from 'react';
import { Card, Text } from 'evergreen-ui';

const Todo = ({ todo }) => {
  return (
    <Card
      padding="1em"
      elevation={1}
      marginBottom="1em"
      textDecoration={todo.completed ? 'line-through' : 'normal'}
    >
      <Text>
        (User ID: {todo.userId}) {todo.title}
      </Text>
    </Card>
  );
};

export default Todo;
