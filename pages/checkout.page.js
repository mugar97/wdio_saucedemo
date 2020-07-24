const BasePage = require("./base.page");

class CheckoutPage extends BasePage {
  constructor() {
    super();
    this.path = "/checkout-step-two.html";
  }
  get summaryContainer() {
    return $("#checkout_summary_container");
  }
  get paymentInformationCode() {
    return $$(".summary_value_label")[0];
  }
  get shippingInformationValue() {
    return $$(".summary_value_label")[1];
  }
  get summarySubtotal() {
    return $(".summary_subtotal_label");
  }
  get summaryTax() {
    return $(".summary_tax_label");
  }
  get summaryTotal() {
    return $(".summary_total_label");
  }
  get cancelButton() {
    return $(".cart_cancel_link");
  }
  get finishButton() {
    return $(".cart_button");
  }
  get cartItems() {
    return $$(".cart_item");
  }
  getSummaryItemById(id) {
    return $(
      `//a[@id='item_${id}_title_link']/ancestor::div[@class='cart_item']`
    );
  }
  getQuantity(item) {
    return item.$(".summary_quantity");
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
  getSummarySubtotal() {
    return this.summarySubtotal.getText().replace("Item total: ", "");
  }
  getSummaryTax() {
    return this.summaryTax.getText().replace("Tax: ", "");
  }
  getSummaryTotal() {
    return this.summaryTotal.getText().replace("Total: ", "");
  }
}

module.exports = new CheckoutPage();
