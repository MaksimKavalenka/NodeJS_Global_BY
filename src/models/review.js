export default class Review {
  constructor(id, productId, author, text) {
    this.id = id;
    this.productId = productId;
    this.author = author;
    this.text = text;
  }

  toString() {
    return {
      id: this.id,
      productId: this.productId,
      author: this.author,
      text: this.text,
    };
  }
}
