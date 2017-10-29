let id = 0;

export default class User {
  constructor(name, age, city) {
    id += 1;
    this.id = String(id);
    this.name = name;
    this.age = age;
    this.city = city;
  }
}
