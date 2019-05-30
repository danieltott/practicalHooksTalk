import React, { useEffect, useCallback } from 'react';
import { useApiClient } from './Api';
import Todo from './Todo';
import { Pane, Text, Heading, Spinner, majorScale } from 'evergreen-ui';
import { Paragraph } from 'evergreen-ui/commonjs/typography';
import useLoad from './useLoad';
import { useUserFilterContext } from './UserFilterContext';

const Todos = () => {
  const Api = useApiClient();

  const {
    state: { user, showCompleted },
  } = useUserFilterContext();

  const apiFn = useCallback(
    user ? () => Api.fetchTodosByUser(user.id, showCompleted) : () => null,
    [user, showCompleted]
  );

  const [{ data: todos, isLoading, updatedAt, error }, load, reset] = useLoad(
    apiFn,
    {
      loadImmediately: false,
    }
  );

  useEffect(() => {
    let interval;

    reset();
    if (user) {
      load();

      interval = setInterval(() => {
        load();
      }, 6000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [load, user, reset]);

  // async fetchTodos() {
  //   this.setState({
  //     isLoading: true,
  //   });

  //   const userId = this.props.user.id;
  //   const showCompleted = this.props.showCompleted;
  //   try {
  //     const data = await Api.fetchTodosByUser(userId, showCompleted);
  //     // if we've changed settings in the background, ignore this update
  //     if (
  //       userId === this.props.user.id &&
  //       showCompleted === this.props.showCompleted
  //     ) {
  //       // set our state
  //       this.setState({
  //         todos: data,
  //         isLoading: false,
  //         updatedAt: new Date(),
  //       });
  //     }
  //   } catch (error) {
  //     clearInterval(this.interval);
  //     this.setState({ error: error, isLoading: false });
  //   }
  // }

  // componentWillUnmount() {
  //   clearInterval(this.interval);
  // }

  // componentDidUpdate(prevProps) {
  //   if (
  //     prevProps.user !== this.props.user ||
  //     prevProps.showCompleted !== this.props.showCompleted
  //   ) {
  //     this.setState({
  //       todos: null,
  //     });

  //     if (this.props.user && this.props.showCompleted) {
  //       this.fetchTodos();
  //       clearInterval(this.interval);
  //       this.interval = setInterval(() => {
  //         this.fetchTodos();
  //       }, 6000);
  //     } else {
  //       clearInterval(this.interval);
  //     }
  //   }
  // }

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
