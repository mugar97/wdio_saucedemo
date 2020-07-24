const product = function ({ title, description, price }) {
  this.title = title;
  this.description = description;
  this.price = price;
};

module.exports = product;
