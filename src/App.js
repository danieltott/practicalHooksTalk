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
    todos: [],
    isLoadingTodos: false,
    selectedUser: null,
    showCompleted: ''
  };

  fetchUsers() {
    return Api.fetchUsers();
  }

  runFetchUsers() {
    this.setState({ isLoadingUsers: true });
    this.fetchUsers()
      .then(data =>
        this.setState({
          users: data,
          isLoadingUsers: false
        })
      )
      .catch(error => this.setState({ error, isLoadingUsers: false }));
  }

  fetchTodos() {
    return Api.fetchTodosByUser(
      this.state.selectedUser.id,
      this.state.showCompleted
    );
  }

  componentDidMount() {
    this.runFetchUsers();
  }

  updateUserSettings(formData) {
    this.setState({
      selectedUser: this.state.users.find(u => u.id === formData.userId),
      showCompleted: formData.showCompleted
    });
  }

  componentDidCatch(error, info) {
    console.log({ error, info });
  }

  render() {
    const { isLoadingUsers, users, selectedUser, showCompleted } = this.state;
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
                showCompleted={showCompleted}
                fetchTodos={this.fetchTodos}
              />
            </div>
          </div>
        </div>
      </section>
    );
  }
}
