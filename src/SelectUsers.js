import React from 'react';

export default class SelectUsers extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      calculatedUsers: []
    };
  }

  expensiveCalculationOnUsers() {
    if (this.props.users) {
      console.log('This takes forever');
      return this.props.users;
    }
    return [];
  }

  componentDidMount() {
    this.setState({
      calculatedUsers: this.expensiveCalculationOnUsers()
    });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.users !== this.props.users) {
      this.setState({
        calculatedUsers: this.expensiveCalculationOnUsers()
      });
    }
  }

  render() {
    const { isLoading, userId, onChange } = this.props;

    return (
      <select
        className="input"
        disabled={isLoading || !this.state.calculatedUsers.length}
        onChange={onChange}
        value={userId}
        name="userId"
      >
        {isLoading || !this.state.calculatedUsers.length ? (
          <option>Loading users...</option>
        ) : (
          <>
            <option value="">Select User...</option>
            {this.state.calculatedUsers.map(user => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </>
        )}
      </select>
    );
  }
}
