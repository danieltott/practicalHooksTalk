import React from 'react';

export default class Filter extends React.Component {
  constructor(props) {
    super(props);

    this.updateUserSelect = this.updateUserSelect.bind(this);
    this.updateUserRadio = this.updateUserRadio.bind(this);
  }

  state = {
    formData: {
      userId: '',
      showCompleted: 'All'
    }
  };

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

  render() {
    const { isLoadingUsers, users, updateUserSettings } = this.props;
    return (
      <form
        onSubmit={e => {
          e.preventDefault();
          updateUserSettings(this.state.formData);
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
                checked={this.state.formData.showCompleted === 'Completed'}
                value="Completed"
                onChange={this.updateUserRadio}
              />{' '}
              Completed
            </label>
            <label className="radio">
              <input
                type="radio"
                name="showCompleted"
                checked={this.state.formData.showCompleted === 'Not Completed'}
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
    );
  }
}
