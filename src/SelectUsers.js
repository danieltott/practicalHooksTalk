import React, { useState, useEffect } from 'react';
import { Select } from 'evergreen-ui';

const SelectUsers = ({ isLoading, userId, onChange, users }) => {
  // const x = useMemo(()=> {return something}, [])
  const [calculatedUsers, setCalculatedUsers] = useState([]);

  useEffect(() => {
    const expensiveCalculationOnUsers = () => {
      if (users) {
        console.log('OMG this takes forever');
        return users;
      }
      return [];
    };

    setCalculatedUsers(expensiveCalculationOnUsers());
  }, [users]);

  return (
    <Select
      disabled={isLoading || !calculatedUsers.length}
      onChange={e => onChange(e.currentTarget.name, e.currentTarget.value)}
      value={userId}
      name="userId"
      id="userId"
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
    </Select>
  );
};

export default SelectUsers;
