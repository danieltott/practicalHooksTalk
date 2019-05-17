import React from 'react';

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
    const { isLoadingUsers, users, updateUserSettings } = this.props;
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
              <select
                className="input"
                disabled={isLoadingUsers || !users}
                onChange={this.updateFormInput}
                value={this.state.userId}
                name="userId"
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
