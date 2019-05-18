import React from 'react';

import Api from './Api';
import Todos from './Todos';
import Filter from './Filter';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.onFilterSubmit = this.onFilterSubmit.bind(this);
    this.fetchTodos = this.fetchTodos.bind(this);
    this.fetchUsers = this.fetchUsers.bind(this);
    this.refreshUsers = this.refreshUsers.bind(this);
  }

  state = {
    // fetching users state
    users: null,
    isLoadingUsers: false,
    error: null,

    // fetching todos state
    todos: null,
    isLoadingTodos: false,
    todosUpdatedAt: null,
    todosError: null,

    // global
    selectedUser: null,
    showCompleted: ''
  };

  async fetchUsers() {
    this.setState({ isLoadingUsers: true });
    try {
      const data = await Api.fetchUsers();
      return this.setState({
        users: data,
        isLoadingUsers: false
      });
    } catch (error) {
      return this.setState({ error, isLoadingUsers: false });
    }
  }

  async fetchTodos() {
    this.setState({
      isLoadingTodos: true
    });

    const userId = this.state.selectedUser.id;
    const showCompleted = this.state.showCompleted;
    try {
      const data = await Api.fetchTodosByUser(userId, showCompleted);
      // if we've changed settings in the background, ignore this update
      if (
        userId === this.state.selectedUser.id &&
        showCompleted === this.state.showCompleted
      ) {
        // set our state
        this.setState({
          todos: data,
          isLoadingTodos: false,
          todosUpdatedAt: new Date()
        });
      }
    } catch (error) {
      clearInterval(this.interval);
      this.setState({ todosError: error, isLoadingTodos: false });
    }
  }

  refreshUsers() {
    this.fetchUsers();
  }

  componentDidMount() {
    this.fetchUsers();
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  onFilterSubmit(formData) {
    this.setState(
      {
        selectedUser: this.state.users.find(
          u => u.id === parseInt(formData.userId, 10)
        ),
        showCompleted: formData.showCompleted,
        todos: null,
        todosError: null
      },
      () => {
        this.fetchTodos();
        clearInterval(this.interval);
        this.interval = setInterval(() => {
          this.fetchTodos();
        }, 6000);
      }
    );
  }

  componentDidCatch(error, info) {
    console.log({ error, info });
    this.setState({ error });
  }

  render() {
    const {
      isLoadingUsers,
      users,
      selectedUser,
      todosUpdatedAt,
      isLoadingTodos,
      todos,
      error,
      todosError
    } = this.state;

    if (error) {
      return (
        <div>
          <h3>There was an error:</h3>
          <p>{error.message}</p>
        </div>
      );
    }
    return (
      <section className="section">
        <div className="container">
          <div className="columns ">
            <div className="column is-one-quarter">
              <Filter
                users={users}
                isLoadingUsers={isLoadingUsers}
                updateUserSettings={this.onFilterSubmit}
                refreshUsers={this.refreshUsers}
              />
            </div>
            <div className="column is-three-quarters">
              <Todos
                user={selectedUser}
                updatedAt={todosUpdatedAt}
                todos={todos}
                isLoading={isLoadingTodos}
                error={todosError}
              />
            </div>
          </div>
        </div>
      </section>
    );
  }
}
