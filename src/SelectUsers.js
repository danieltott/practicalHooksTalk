import React from 'react';

const SelectUsers = ({ isLoading, userId, onChange, users }) => {
  const [calculatedUsers, setCalculatedUsers] = React.useState([]);

  React.useEffect(() => {
    const expensiveCalculationOnUsers = () => {
      console.log('OMG this takes forever');
      if (users) {
        return setCalculatedUsers(users);
      }
      return setCalculatedUsers([]);
    };

    expensiveCalculationOnUsers();
  }, [users]);

  return (
    <select
      className="input"
      disabled={isLoading || !calculatedUsers.length}
      onChange={onChange}
      value={userId}
      name="userId"
    >
      {isLoading || !calculatedUsers.length ? (
        <option>Loading users...</option>
      ) : (
        <>
          <option value="">Select User...</option>
          {calculatedUsers.map(user => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </>
      )}
    </select>
  );
};

export default SelectUsers;
