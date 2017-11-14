export default class Product {
  constructor(id, name, brand, company, price, isbn) {
    this.id = id;
    this.name = name;
    this.brand = brand;
    this.company = company;
    this.price = price;
    this.isbn = isbn;
  }

  toString() {
    return {
      id: this.id,
      name: this.name,
      brand: this.brand,
      company: this.company,
      price: this.price,
      isbn: this.isbn,
    };
  }
}
