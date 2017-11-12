export default class Credentials {
  constructor(userId, login, password) {
    this.userId = userId;
    this.login = login;
    this.password = password;
  }

  toString() {
    return {
      userId: this.userId,
      login: this.login,
      password: this.password,
    };
  }
}
