const products = require("../fixtures/products");

const getProductInformation = function (id) {
  return products.find((p) => p.id == id);
};

module.exports = {
  getProductInformation: getProductInformation,
};
