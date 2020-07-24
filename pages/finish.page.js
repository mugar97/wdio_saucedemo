const BasePage = require("./base.page");

class FinishPage extends BasePage {
  constructor() {
    super();
    this.path = "/checkout-complete.html";
  }
  get header() {
    return $(".complete-header");
  }
  get text() {
    return $(".complete-text");
  }
  get image() {
    return $("img.pony_express");
  }
}

module.exports = new FinishPage();
