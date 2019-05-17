import React from 'react';

import Api from './Api';
import Todos from './Todos';
import Filter from './Filter';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.updateUserSettings = this.updateUserSettings.bind(this);
    this.fetchTodos = this.fetchTodos.bind(this);
  }

  state = {
    users: [],
    isLoadingUsers: false,
    errors: null,
    todos: null,
    isLoadingTodos: false,
    selectedUser: null,
    showCompleted: '',
    timer: null,
    todosUpdatedAt: null,
    updatedCount: 0
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
        userId === this.state.updatedCount &&
        showCompleted === this.state.showCompleted
      ) {
        // set our state
        this.setState({
          todos: data,
          isLoadingTodos: false,
          todosUpdatedAt: new Date()
        });
        // refresh our data in 5 seconds
        this.timer = setTimeout(() => {
          this.fetchTodos();
        }, 5000);
      }
    } catch (error) {
      this.setState({ error, isLoadingTodos: false });
    }
  }

  componentDidMount() {
    this.fetchUsers();
  }

  updateUserSettings(formData) {
    this.setState(
      {
        selectedUser: this.state.users.find(u => u.id === formData.userId),
        showCompleted: formData.showCompleted,
        updatedCount: this.state.updatedCount + 1,
        todos: null
      },
      () => {
        this.fetchTodos();
      }
    );
  }

  componentDidCatch(error, info) {
    console.log({ error, info });
  }

  render() {
    const {
      isLoadingUsers,
      users,
      selectedUser,
      todosUpdatedAt,
      isLoadingTodos,
      todos
    } = this.state;
    return (
      <section className="section">
        <div className="container">
          <div className="columns ">
            <div className="column is-one-quarter">
              <Filter
                users={users}
                isLoadingUsers={isLoadingUsers}
                updateUserSettings={this.updateUserSettings}
              />
            </div>
            <div className="column is-three-quarters">
              <Todos
                user={selectedUser}
                updatedAt={todosUpdatedAt}
                todos={todos}
                isLoading={isLoadingTodos}
              />
            </div>
          </div>
        </div>
      </section>
    );
  }
}
