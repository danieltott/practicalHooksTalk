import React, { useState, useEffect } from 'react';
import SelectUsers from './SelectUsers';

const Filter = ({
  isLoadingUsers,
  users,
  updateUserSettings,
  refreshUsers
}) => {
  const [formData, setFormData] = useState({
    userId: '',
    showCompleted: 'All'
  });
  const [isValid, setIsValid] = useState(false);

  function updateFormInput(e) {
    setFormData({
      ...formData,
      [e.currentTarget.name]: e.currentTarget.value
    });
    setIsValid(false);
  }

  useEffect(() => {
    let isCurrent = true;
    async function validate() {
      console.log('validating');
      await new Promise(resolve => setTimeout(resolve, 500));
      if (isCurrent) {
        setIsValid(!!(formData.userId && formData.showCompleted));
        console.log('validation complete');
      } else {
        console.log('validation cancelled');
      }
    }
    validate();

    return () => {
      isCurrent = false;
    };
  }, [formData]);

  const { userId, showCompleted } = formData;
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
              userId={userId}
              onChange={updateFormInput}
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
              checked={showCompleted === 'All'}
              onChange={updateFormInput}
            />{' '}
            All
          </label>
          <label className="radio">
            <input
              type="radio"
              name="showCompleted"
              checked={showCompleted === 'Completed'}
              value="Completed"
              onChange={updateFormInput}
            />{' '}
            Completed
          </label>
          <label className="radio">
            <input
              type="radio"
              name="showCompleted"
              checked={showCompleted === 'Not Completed'}
              value="Not Completed"
              onChange={updateFormInput}
            />{' '}
            Not Completed
          </label>
        </div>
      </div>
      <div>
        <button
          type="submit"
          className="button is-primary"
          disabled={isLoadingUsers || !isValid}
        >
          Submit
        </button>
      </div>
    </form>
  );
};
export default Filter;
