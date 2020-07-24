class BasePage {
  constructor() {
    this.path = "/";
  }

  get shoppingCartBadge() {
    return $(".shopping_cart_badge");
  }
  get cartButton() {
    return $("svg[data-icon='shopping-cart'] path");
  }
  open() {
    browser.url(this.path);
  }
}
module.exports = BasePage;
