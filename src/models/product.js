let id = 0;

export default class Product {
  constructor(name, brand, price) {
    id += 1;
    this.id = String(id);
    this.name = name;
    this.brand = brand;
    this.price = price;
  }
}
