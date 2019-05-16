import React from 'react';
import Todo from './Todo';
import Api from './Api';
import { ReactComponent as Loader } from './Loader.svg';

export default class Todos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: props.user,
      showCompleted: props.showCompleted,
      todos: null,
      isLoading: false,
      updatedAt: null
    };
  }

  fetchTodos() {
    this.setState({ isLoading: true });

    Api.fetchTodosByUser(this.state.user.id, this.state.showCompleted)
      .then(data => {
        this.setState({
          todos: data,
          isLoading: false,
          updatedAt: new Date()
        });
      })
      .catch(error => this.setState({ error, isLoading: false }));

    this.timer = setTimeout(() => {
      this.fetchTodos();
    }, 5000);
  }

  componentDidMount() {
    if (this.state.user) {
      this.fetchTodos();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    // console.log(this.props.user);
    if (
      prevProps.user !== this.props.user ||
      prevProps.showCompleted !== this.props.showCompleted
    ) {
      clearTimeout(this.timer);
      this.setState(
        {
          user: this.props.user,
          showCompleted: this.props.showCompleted,
          todos: null
        },
        () => {
          this.fetchTodos();
        }
      );
    }
  }

  render() {
    const { isLoading, todos, user, updatedAt } = this.state;

    if (!todos && isLoading) {
      return <Loader className="loaderSvg" />;
    }

    if (!todos) {
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
  }
}
