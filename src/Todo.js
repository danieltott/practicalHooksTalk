import React from 'react';
import { Card, Text } from 'evergreen-ui';
import { useUserFilterContext } from './UserFilterContext';

const Todo = ({ todo }) => {
  const {
    state: { user },
  } = useUserFilterContext();

  return (
    <Card
      padding="1em"
      elevation={1}
      marginBottom="1em"
      textDecoration={todo.completed ? 'line-through' : 'normal'}
    >
      <Text>
        (User: {user.name}) {todo.title}
      </Text>
    </Card>
  );
};

export default Todo;
