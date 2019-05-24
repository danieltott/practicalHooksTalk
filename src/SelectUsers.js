import React from 'react';
import { Select } from 'evergreen-ui';

export default class SelectUsers extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      calculatedUsers: []
    };
  }

  expensiveCalculationOnUsers() {
    if (this.props.users) {
      console.log('OMG this takes forever');
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
      <Select
        disabled={isLoading || !this.state.calculatedUsers.length}
        onChange={e => onChange(e.currentTarget.name, e.currentTarget.value)}
        value={userId}
        name="userId"
        id="userId"
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
      </Select>
    );
  }
}
