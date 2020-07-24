const user = require("../../fixtures/user.js");
const product = require("../../model/product");
const app = require("../../utils/app");

const loginPage = require("../../pages/login.page");
const productsPage = require("../../pages/products.page");
const cartPage = require("../../pages/cart,page");
const informationPage = require("../../pages/information.page");
const checkoutPage = require("../../pages/checkout.page");
const finishPage = require("../../pages/finish.page");

describe("Sauce Demo Testing", () => {
  it("Make a successful purchase on the website", () => {
    let products = [];
    let list = [];

    //Login
    loginPage.open();
    loginPage.loginWithCredentials(user);
    productsPage.inventoryContainer.waitForDisplayed();

    //Adding 1 product to the shopping cart
    let randomProduct = productsPage.randomProductBox;
    products.push(productsPage.getProductObject(randomProduct));
    productsPage.addProductToCart(randomProduct);
    productsPage.shoppingCartBadge.waitForDisplayed();

    //Going to the cart
    productsPage.goToShoppingCart();
    expect(cartPage.cartList).toBeDisplayed();

    products = products
      .filter((v, i, a) => a.indexOf(v) === i)
      .map((x) => new product(x));
    list = cartPage.getItemsAsProductObject();
    expect(list).toEqual(products);
    cartPage.checkoutButton.click();
    informationPage.checkoutInfo.waitForDisplayed();

    //Filling user Information
    informationPage.fillUserInfo(user);
    informationPage.continue();
    checkoutPage.summaryContainer.waitForDisplayed();

    //Checkout
    checkoutPage.finishButton.click();
    expect(finishPage.image).toBeDisplayed();
  });
});
