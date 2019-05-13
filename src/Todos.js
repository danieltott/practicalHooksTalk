import React from 'react';
import { SemipolarSpinner } from 'react-epic-spinners';
import Todo from './Todo';
import Api from './Api';

export default class Todos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: props.user,
      showCompleted: props.showCompleted,
      todos: null,
      isLoading: false
    };
  }

  fetchTodos() {
    this.setState({ isLoading: true });

    Api.fetchTodosByUser(this.state.user.id, this.state.showCompleted)
      .then(data =>
        this.setState({
          todos: data,
          isLoading: false
        })
      )
      .catch(error => this.setState({ error, isLoading: false }));
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
      this.setState(
        {
          user: this.props.user,
          showCompleted: this.props.showCompleted
        },
        () => {
          this.fetchTodos();
        }
      );
    }
  }

  render() {
    return this.state.isLoading || !this.state.todos ? (
      <SemipolarSpinner color="#ccc" className="spinner" />
    ) : (
      <>
        <h2>Todos for {this.state.user.name}</h2>
        {this.state.todos.map(todo => (
          <Todo key={todo.id} todo={todo} />
        ))}
      </>
    );
  }
}
