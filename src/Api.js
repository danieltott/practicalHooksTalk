import React, { createContext, useContext } from 'react';

export class Api {
  static sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async fetchUsers() {
    // throw new Error('we messed up');
    await Api.sleep(500);
    const response = await fetch(`https://jsonplaceholder.typicode.com/users`);
    return await response.json();
  }

  async fetchTodosByUser(userId, showCompleted) {
    const query = `?userId=${userId}${
      showCompleted === 'Completed'
        ? '&completed=true'
        : showCompleted === 'Not Completed'
        ? '&completed=false'
        : ''
    }`;

    await Api.sleep(1000);
    if (userId === 10) {
      throw new Error('User not found.');
    }
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/todos${query}`
    );
    return await response.json();
  }
}

const ApiClient = new Api();

export default ApiClient;

export const ApiClientContext = createContext(null);

export const useApiClient = () => useContext(ApiClientContext);

export const ApiClientProvider = ({ children }) => (
  <ApiClientContext.Provider value={ApiClient}>
    {children}
  </ApiClientContext.Provider>
);
