import React from 'react';
import { Pane, majorScale, Alert, Text } from 'evergreen-ui';
import Api from './Api';
import Todos from './Todos';
import Filter from './Filter';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.onFilterSubmit = this.onFilterSubmit.bind(this);
    this.fetchUsers = this.fetchUsers.bind(this);
    this.refreshUsers = this.refreshUsers.bind(this);
  }

  state = {
    // global error
    globalError: null,
    // fetching users state
    users: null,
    isLoadingUsers: false,
    usersError: null,

    // filter form state
    selectedUser: null,
    showCompleted: '',
  };

  async fetchUsers() {
    this.setState({ isLoadingUsers: true });
    try {
      const data = await Api.fetchUsers();
      return this.setState({
        users: data,
        isLoadingUsers: false,
      });
    } catch (error) {
      return this.setState({ usersError: error, isLoadingUsers: false });
    }
  }

  refreshUsers() {
    this.fetchUsers();
  }

  componentDidMount() {
    this.fetchUsers();
  }

  onFilterSubmit(formData) {
    this.setState({
      selectedUser: this.state.users.find(
        u => u.id === parseInt(formData.userId, 10)
      ),
      showCompleted: formData.showCompleted,
    });
  }

  componentDidCatch(error, info) {
    console.log({ error, info });
    this.setState({ globalError: error });
  }

  render() {
    const {
      isLoadingUsers,
      users,
      globalError,
      usersError,
      selectedUser,
      showCompleted,
    } = this.state;

    if (globalError || usersError) {
      return (
        <Pane
          maxWidth={800}
          border
          marginX="auto"
          marginY={majorScale(2)}
          padding={majorScale(2)}
        >
          <Alert intent="danger" title="There was an error:">
            {globalError && <Text>{globalError.message}</Text>}
            {usersError && <Text>{usersError.message}</Text>}
          </Alert>
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
          <Todos user={selectedUser} showCompleted={showCompleted} />
        </Pane>
      </Pane>
    );
  }
}
