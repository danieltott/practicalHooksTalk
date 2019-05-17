import React, { useReducer, useEffect } from 'react';
import SelectUsers from './SelectUsers';

const reducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_FORM_INPUT':
      const formData = {
        ...state.formData,
        [action.name]: action.value
      };

      return {
        ...state,
        formData,
        isValid: false
      };
    case 'VALIDATE':
      return {
        ...state,
        isValid: action.isValid
      };
    default:
      throw new Error('Invalid action type');
  }
};

const Filter = ({
  isLoadingUsers,
  users,
  updateUserSettings,
  refreshUsers
}) => {
  const [state, dispatch] = useReducer(reducer, {
    formData: {
      userId: '',
      showCompleted: 'All'
    },
    isValid: false
  });

  useEffect(() => {
    const validate = async () => {
      console.log('validating...');
      await new Promise(resolve => setTimeout(resolve, 2000));
      dispatch({
        type: 'VALIDATE',
        isValid: !!(state.formData.userId && state.formData.showCompleted)
      });
    };
    validate();
  }, [state.formData]);

  function updateFormInput(e) {
    dispatch({
      type: 'UPDATE_FORM_INPUT',
      name: e.currentTarget.name,
      value: e.currentTarget.value
    });
  }

  return (
    <form
      data-testid="filtersform"
      onSubmit={e => {
        e.preventDefault();
        updateUserSettings(state.formData);
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
              userId={state.formData.userId}
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
              checked={state.formData.showCompleted === 'All'}
              onChange={updateFormInput}
            />{' '}
            All
          </label>
          <label className="radio">
            <input
              type="radio"
              name="showCompleted"
              checked={state.formData.showCompleted === 'Completed'}
              value="Completed"
              onChange={updateFormInput}
            />{' '}
            Completed
          </label>
          <label className="radio">
            <input
              type="radio"
              name="showCompleted"
              checked={state.formData.showCompleted === 'Not Completed'}
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
          disabled={isLoadingUsers || !state.isValid}
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default Filter;
