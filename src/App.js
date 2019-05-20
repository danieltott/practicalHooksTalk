import React, { useState } from 'react';

import Api from './Api';
import Todos from './Todos';
import Filter from './Filter';
import useLoadData from './useLoadData';

const withErrorBoundary = WrappedComponent => {
  return class extends React.Component {
    state = {
      error: null
    };
    componentDidCatch(error, info) {
      console.log({ error, info });
      this.setState({ error });
    }

    render() {
      if (this.state.error) {
        return (
          <div>
            <h3>There was an error:</h3>
            <p>{this.state.error.message}</p>
          </div>
        );
      }
      return <WrappedComponent />;
    }
  };
};

const App = () => {
  const [filterData, setFilterData] = useState({
    selectedUser: null,
    showCompleted: ''
  });
  const [usersState, loadUsers] = useLoadData(Api.fetchUsers);

  const onFilterSubmit = formData => {
    setFilterData({
      selectedUser: usersState.data.find(
        u => u.id === parseInt(formData.userId, 10)
      ),
      showCompleted: formData.showCompleted
    });
  };

  if (usersState.error) {
    return (
      <div>
        <h3>There was an error loading users:</h3>
        <p>{usersState.error.message}</p>
      </div>
    );
  }

  return (
    <section className="section">
      <div className="container">
        <div className="columns ">
          <div className="column is-one-quarter">
            <Filter
              users={usersState.data}
              isLoadingUsers={usersState.isLoading}
              updateUserSettings={onFilterSubmit}
              refreshUsers={() => {
                loadUsers();
              }}
            />
          </div>
          <div className="column is-three-quarters">
            <Todos
              user={filterData.selectedUser}
              showCompleted={filterData.showCompleted}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default withErrorBoundary(App);
