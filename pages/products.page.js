const BasePage = require("./base.page");
const products = require("../fixtures/products");

class ProductsPage extends BasePage {
  constructor() {
    super();
    this.path = "/inventory.html";
    this.sortBy = {
      NAME_A_TO_Z: 0,
      NAME_Z_TO_A: 1,
      PRICE_LOW_TO_HIGH: 2,
      PRICE_HIGH_TO_LOW: 3,
    };
  }

  get inventoryContainer() {
    return $("#inventory_container");
  }
  get randomProductBox() {
    let item = Math.floor(Math.random() * 6) + 1;
    return $(`//div[@class='inventory_item'][${item}]`);
  }
  get productContainers() {
    return $$("//div[@class='inventory_item']");
  }
  get filter() {
    return $(".product_sort_container");
  }
  getProductBoxByID(id) {
    return $(
      `//a[@id='item_${id}_title_link']/ancestor::*[@class="inventory_item"]`
    );
  }
  getProductAddToCartButton(product) {
    return product.$(".btn_inventory");
  }
  getProductTitle(product) {
    return product.$(".inventory_item_name");
  }
  getProductDescription(product) {
    return product.$(".inventory_item_desc");
  }
  getProductPrice(product) {
    return product.$(".inventory_item_price");
  }
  getProductId(product) {
    return +product
      .$(".inventory_item_label a")
      .getAttribute("id")
      .replace(/item_|_title_link/g, "");
  }
  pickRandomProduct() {
    let product = this.randomProductBox;
    return this.getProductObject(product);
  }
  getProductObject(productBox) {
    return {
      id: this.getProductId(productBox),
      title: this.getProductTitle(productBox).getText(),
      description: this.getProductDescription(productBox).getText(),
      price: this.getProductPrice(productBox).getText().replace("$", ""),
    };
  }
  getProductsArray() {
    let prodList = [];
    this.productContainers.forEach((p) => {
      prodList.push(this.getProductObject(p));
    });
    return prodList;
  }
  addProductToCart(product) {
    this.getProductAddToCartButton(product).click();
  }
  goToShoppingCart() {
    this.shoppingCartBadge.click();
  }
  filterBy(option = this.sortBy.NAME_A_TO_Z) {
    this.filter.selectByIndex(option);
  }
}

module.exports = new ProductsPage();
