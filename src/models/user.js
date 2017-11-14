export default class User {
  constructor(id, name, email) {
    this.id = id;
    this.name = name;
    this.email = email;
  }

  toString() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
    };
  }
}
