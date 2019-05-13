import React from 'react';

import Api from './Api';
import Todos from './Todos';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.updateUserSelect = this.updateUserSelect.bind(this);
    this.updateUserRadio = this.updateUserRadio.bind(this);
  }

  state = {
    users: [],
    isLoadingUsers: false,
    errors: null,
    todos: [],
    isLoadingTodos: false,
    selectedUser: null,
    showCompleted: '',
    formData: {
      userId: '',
      showCompleted: 'All'
    }
  };

  fetchUsers() {
    this.setState({ isLoadingUsers: true });
    Api.fetchUsers()
      .then(data => {
        // randomly select user to pre-select
        const selectedUserId = data[Math.floor(Math.random() * data.length)].id;
        return this.setState({
          users: data,
          isLoadingUsers: false,
          formData: {
            ...this.state.formData,
            userId: selectedUserId
          }
        });
      })
      .catch(error => this.setState({ error, isLoadingUsers: false }));
  }

  updateUserSelect(e) {
    const value = parseInt(e.currentTarget.value, 10);

    this.setState({
      formData: {
        ...this.state.formData,
        userId: value
      }
    });
  }

  updateUserRadio(e) {
    this.setState({
      formData: {
        ...this.state.formData,
        showCompleted: e.currentTarget.checked && e.currentTarget.value
      }
    });
  }

  componentDidMount() {
    this.fetchUsers();
  }

  updateUserSettings() {
    this.setState({
      selectedUser: this.state.users.find(
        u => u.id === this.state.formData.userId
      ),
      showCompleted: this.state.formData.showCompleted
    });
  }

  componentDidCatch(error, info) {
    console.log({ error, info });
  }

  render() {
    const { isLoadingUsers, users } = this.state;
    return (
      <section className="section">
        <div className="container">
          <div className="columns ">
            <form
              className="column is-one-quarter"
              onSubmit={e => {
                e.preventDefault();
                this.updateUserSettings();
              }}
            >
              <legend className="title is-4 is-spaced">
                View ToDos by User
              </legend>
              <div className="field">
                <label className="label">User:</label>
                <div className="control">
                  <div className="select">
                    <select
                      className="input"
                      disabled={isLoadingUsers || !users}
                      onChange={this.updateUserSelect}
                      value={this.state.formData.userId}
                    >
                      {isLoadingUsers || !users ? (
                        <option>Loading users...</option>
                      ) : (
                        <>
                          <option value="">Select User...</option>
                          {users.map(user => (
                            <option key={user.id} value={user.id}>
                              {user.name}
                            </option>
                          ))}
                        </>
                      )}
                    </select>
                  </div>
                </div>
              </div>
              <div className="field">
                <div className="control">
                  <label className="radio">
                    <input
                      type="radio"
                      name="showCompleted"
                      value="All"
                      checked={this.state.formData.showCompleted === 'All'}
                      onChange={this.updateUserRadio}
                    />{' '}
                    All
                  </label>
                  <label className="radio">
                    <input
                      type="radio"
                      name="showCompleted"
                      checked={
                        this.state.formData.showCompleted === 'Completed'
                      }
                      value="Completed"
                      onChange={this.updateUserRadio}
                    />{' '}
                    Completed
                  </label>
                  <label className="radio">
                    <input
                      type="radio"
                      name="showCompleted"
                      checked={
                        this.state.formData.showCompleted === 'Not Completed'
                      }
                      value="Not Completed"
                      onChange={this.updateUserRadio}
                    />{' '}
                    Not Completed
                  </label>
                </div>
              </div>
              <div>
                <button type="submit" className="button is-primary">
                  Submit
                </button>
              </div>
            </form>
            <div className="column is-three-quarters">
              <Todos
                user={this.state.selectedUser}
                showCompleted={this.state.showCompleted}
              />
            </div>
          </div>
        </div>
      </section>
    );
  }
}
