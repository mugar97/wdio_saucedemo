const BasePage = require("./base.page");
const product = require("../model/product");

class CartPage extends BasePage {
  constructor() {
    super();
    this.path = "/cart.html";
  }
  get cartList() {
    return $(".cart_list");
  }
  get cartItems() {
    return $$(".cart_item");
  }
  get checkoutButton() {
    return $(".checkout_button");
  }
  get continueShoppingButton() {
    return $(".cart_footer .btn_secondary");
  }
  getCartItemById(id) {
    return $(
      `//a[@id='item_${id}_title_link']/ancestor::div[@class='cart_item']`
    );
  }
  getQuantity(item) {
    return item.$(".cart_quantity");
  }
  getId(item) {
    return +item
      .$(".cart_item_label a")
      .getAttribute("id")
      .replace(/item_|_title_link/g, "");
  }
  getTitle(item) {
    return item.$(".inventory_item_name");
  }
  getDescription(item) {
    return item.$(".inventory_item_desc");
  }
  getPrice(item) {
    return item.$(".inventory_item_price");
  }
  getRemoveButton(item) {
    return item.$(".cart_button");
  }
  getItemsAsProductObject() {
    let items = [];
    this.cartItems.forEach((item) => {
      items.push(
        new product({
          id: this.getId(item),
          title: this.getTitle(item).getText(),
          description: this.getDescription(item).getText(),
          price: this.getPrice(item).getText().replace("$", ""),
        })
      );
    });
    return items;
  }
}

module.exports = new CartPage();
