import React, { useEffect, useState } from 'react';

const SelectUsers = ({ isLoading, userId, onChange, users }) => {
  const [calculatedUsers, setCalculatedUsers] = useState([]);

  useEffect(() => {
    if (users) {
      console.log('OMG this takes forever');
      return setCalculatedUsers(users);
    }
    return setCalculatedUsers([]);
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
