export class Api {
  constructor() {
    this.fetchUsers = this.fetchUsers.bind(this);
    this.fetchTodosByUser = this.fetchTodosByUser.bind(this);
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  count = 0;

  async fetchUsers() {
    this.count++;

    if (this.count > 100) {
      throw new Error('Count Exceeded');
    }
    // throw new Error('we messed up');
    await this.sleep(500);
    const response = await fetch(`https://jsonplaceholder.typicode.com/users`);
    return await response.json();
  }

  async fetchTodosByUser(userId, showCompleted) {
    this.count++;

    if (this.count > 100) {
      throw new Error('Count Exceeded');
    }
    const query = `?userId=${userId}${
      showCompleted === 'Completed'
        ? '&completed=true'
        : showCompleted === 'Not Completed'
        ? '&completed=false'
        : ''
    }`;

    await this.sleep(1000);
    if (userId === 10) {
      throw new Error('User not found.');
    }
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/todos${query}`
    );
    return await response.json();
  }
}

export default new Api();
