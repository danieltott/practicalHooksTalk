import React from 'react';
import Api from './Api';
import Todo from './Todo';
import { Pane, Text, Heading, Spinner, majorScale } from 'evergreen-ui';
import { Paragraph } from 'evergreen-ui/commonjs/typography';

export default class Todos extends React.Component {
  constructor(props) {
    super(props);

    this.fetchTodos = this.fetchTodos.bind(this);
  }

  state = {
    todos: null,
    isLoading: false,
    updatedAt: null,
    error: null,
  };

  async fetchTodos() {
    this.setState({
      isLoading: true,
    });

    const userId = this.props.user.id;
    const showCompleted = this.props.showCompleted;
    try {
      const data = await Api.fetchTodosByUser(userId, showCompleted);
      // if we've changed settings in the background, ignore this update
      if (
        userId === this.props.user.id &&
        showCompleted === this.props.showCompleted
      ) {
        // set our state
        this.setState({
          todos: data,
          isLoading: false,
          updatedAt: new Date(),
        });
      }
    } catch (error) {
      clearInterval(this.interval);
      this.setState({ error: error, isLoading: false });
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.user !== this.props.user ||
      prevProps.showCompleted !== this.props.showCompleted
    ) {
      this.setState({
        todos: null,
      });

      if (this.props.user && this.props.showCompleted) {
        this.fetchTodos();
        clearInterval(this.interval);
        this.interval = setInterval(() => {
          this.fetchTodos();
        }, 6000);
      } else {
        clearInterval(this.interval);
      }
    }
  }

  render() {
    const { user } = this.props;
    const { isLoading, todos, updatedAt, error } = this.state;
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
  }
}
