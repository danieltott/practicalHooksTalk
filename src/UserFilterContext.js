import React, { createContext, useReducer, useContext } from 'react';

const initialState = { user: null, showCompleted: '' };

function reducer(state, action) {
  switch (action.type) {
    case 'update':
      return {
        user: action.user,
        showCompleted: action.showCompleted,
      };
    default:
      throw new Error(
        `Unrecognized action type in useUserFilter reducer: ${action.type}`
      );
  }
}

const UserFilterContext = createContext();

const UserFilterProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <UserFilterContext.Provider value={{ state, dispatch }}>
      {children}
    </UserFilterContext.Provider>
  );
};

export const useUserFilterContext = () => {
  return useContext(UserFilterContext);
};

export default UserFilterProvider;
