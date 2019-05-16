export class Api {
  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  fetchUsers() {
    return this.sleep(500).then(() =>
      fetch(`https://jsonplaceholder.typicode.com/users`).then(response =>
        response.json()
      )
    );
  }

  fetchTodosByUser(userId, showCompleted) {
    const query = `?userId=${userId}${
      showCompleted === 'Completed'
        ? '&completed=true'
        : showCompleted === 'Not Completed'
        ? '&completed=false'
        : ''
    }`;

    return this.sleep(1500).then(() =>
      fetch(`https://jsonplaceholder.typicode.com/todos${query}`).then(
        response => response.json()
      )
    );
  }
}

export default new Api();
