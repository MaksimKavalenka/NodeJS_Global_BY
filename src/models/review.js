let id = 0;

export default class Review {
  constructor(productId, author, text) {
    id += 1;
    this.id = String(id);
    this.productId = productId;
    this.author = author;
    this.text = text;
  }
}
