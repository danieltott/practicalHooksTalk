import React from 'react';
import { Pane, majorScale, Alert, Text } from 'evergreen-ui';
import { useApiClient } from './Api';
import Todos from './Todos';
import Filter from './Filter';
import useLoad from './useLoad';
import { useUserFilterContext } from './UserFilterContext';

const withErrorBoundary = RenderedComponent =>
  class extends React.Component {
    state = {
      globalError: null,
    };

    componentDidCatch(error, info) {
      console.log({ error, info });
      this.setState({ globalError: error });
    }

    render() {
      return <RenderedComponent globalError={this.state.globalError} />;
    }
  };

const App = ({ globalError }) => {
  const Api = useApiClient();
  const { dispatch: userFilterDispatch } = useUserFilterContext();

  const [usersState, loadUsers] = useLoad(Api.fetchUsers);

  const {
    data: users,
    isLoading: isLoadingUsers,
    error: usersError,
  } = usersState;

  function refreshUsers() {
    loadUsers();
  }

  function onFilterSubmit(formData) {
    userFilterDispatch({
      type: 'update',
      user: users.find(u => u.id === parseInt(formData.userId, 10)),
      showCompleted: formData.showCompleted,
    });
  }

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
    <Pane maxWidth={800} marginX="auto" marginY={majorScale(2)} display="flex">
      <Pane flex={1} padding={majorScale(2)}>
        <Filter
          users={users}
          isLoadingUsers={isLoadingUsers}
          updateUserSettings={onFilterSubmit}
          refreshUsers={refreshUsers}
        />
      </Pane>
      <Pane flex={3} padding={majorScale(2)}>
        <Todos />
      </Pane>
    </Pane>
  );
};

export default withErrorBoundary(App);
