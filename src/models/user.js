let id = 0;

export default class User {
  constructor(name, email) {
    id += 1;
    this.id = String(id);
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
