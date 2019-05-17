import React from 'react';
import SelectUsers from './SelectUsers';

export default class Filter extends React.Component {
  constructor(props) {
    super(props);

    this.updateFormInput = this.updateFormInput.bind(this);
  }

  state = {
    userId: '',
    showCompleted: 'All'
  };

  updateFormInput(e) {
    this.setState({
      [e.currentTarget.name]: e.currentTarget.value
    });
  }

  render() {
    const {
      isLoadingUsers,
      users,
      updateUserSettings,
      refreshUsers
    } = this.props;
    const { userId, showCompleted } = this.state;
    return (
      <form
        data-testid="filtersform"
        onSubmit={e => {
          e.preventDefault();
          updateUserSettings({ userId, showCompleted });
        }}
      >
        <legend className="title is-6 is-spaced">Filter Todos:</legend>
        <div className="field">
          <label className="label">User:</label>
          <div className="control">
            <div className="select">
              <SelectUsers
                isLoading={isLoadingUsers}
                users={users}
                userId={this.state.userId}
                onChange={this.updateFormInput}
              />
            </div>
          </div>
        </div>
        <div>
          <button onClick={refreshUsers} type="button">
            Refresh Users...
          </button>
        </div>
        <div className="field">
          <div className="control">
            <label className="radio">
              <input
                type="radio"
                name="showCompleted"
                value="All"
                checked={this.state.showCompleted === 'All'}
                onChange={this.updateFormInput}
              />{' '}
              All
            </label>
            <label className="radio">
              <input
                type="radio"
                name="showCompleted"
                checked={this.state.showCompleted === 'Completed'}
                value="Completed"
                onChange={this.updateFormInput}
              />{' '}
              Completed
            </label>
            <label className="radio">
              <input
                type="radio"
                name="showCompleted"
                checked={this.state.showCompleted === 'Not Completed'}
                value="Not Completed"
                onChange={this.updateFormInput}
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
    );
  }
}
