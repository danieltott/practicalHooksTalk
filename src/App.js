import React from 'react';
import { Pane, majorScale, Heading, Text } from 'evergreen-ui';
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
    selectedUser: null,
    showCompleted: '',
    todosUpdatedAt: null,
    todosError: null
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
        <Pane
          maxWidth={800}
          border
          marginX="auto"
          marginY={majorScale(2)}
          padding={majorScale(2)}
          display="flex"
        >
          <Heading>There was an error:</Heading>
          <Text>{error.message}</Text>
        </Pane>
      );
    }
    return (
      <Pane
        maxWidth={800}
        marginX="auto"
        marginY={majorScale(2)}
        display="flex"
      >
        <Pane flex={1} padding={majorScale(2)}>
          <Filter
            users={users}
            isLoadingUsers={isLoadingUsers}
            updateUserSettings={this.onFilterSubmit}
            refreshUsers={this.refreshUsers}
          />
        </Pane>
        <Pane flex={3} padding={majorScale(2)}>
          <Todos
            user={selectedUser}
            updatedAt={todosUpdatedAt}
            todos={todos}
            isLoading={isLoadingTodos}
            error={todosError}
          />
        </Pane>
      </Pane>
    );
  }
}
