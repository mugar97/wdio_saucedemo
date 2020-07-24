const { setCartItems, clearSession, getCartItems } = require("../../utils/app");
const cartPage = require("../../pages/cart,page");
const data = require("../../utils/data");

describe("Cart tests", () => {
  describe("General cart tests", () => {
    beforeEach(() => {
      clearSession();
      cartPage.open();
    });
    it("Empty cart should contain basic wareframe", () => {
      expect(cartPage.cartList).toBeDisplayed();
      expect(cartPage.continueShoppingButton).toBeDisplayed();
      expect(cartPage.checkoutButton).toBeDisplayed();
    });
    it("Continue shopping button should redirect to Invetory", () => {
      cartPage.continueShoppingButton.click();
      expect(browser).toHaveUrl("https://www.saucedemo.com/inventory.html");
    });
    it("Checkout button should redirect to Checkout step one form", () => {
      cartPage.checkoutButton.click();
      expect(browser).toHaveUrl(
        "https://www.saucedemo.com/checkout-step-one.html"
      );
    });
  });
  describe("Remove button tests", () => {
    const initialItems = [3, 0, 4, 2];
    const itemsPartialRemove = [4, 2];
    const itemsPartialLeft = [0, 3];
    beforeEach(() => {
      clearSession();
      setCartItems(initialItems);
      cartPage.open();
    });
    it("Remove items letting other items", () => {
      itemsPartialRemove.forEach((item) => {
        cartPage.getRemoveButton(cartPage.getCartItemById(item)).click();
      });
      should(cartPage.cartItems).to.have.lengthOf(itemsPartialLeft.length);
      should(getCartItems()).to.have.lengthOf(itemsPartialLeft.length);
      expect(cartPage.shoppingCartBadge).toHaveText(
        itemsPartialLeft.length.toString()
      );
      itemsPartialLeft.forEach((item) => {
        expect(cartPage.getCartItemById(item)).toBeDisplayed();
      });
    });
    it("Remove all the items", () => {
      initialItems.forEach((item) => {
        cartPage.getRemoveButton(cartPage.getCartItemById(item)).click();
      });
      expect(cartPage.shoppingCartBadge).not.toBeDisplayed();
      should(getCartItems()).to.be.empty;
      expect(cartPage.cartList).toBeDisplayed();
      expect(cartPage.continueShoppingButton).toBeDisplayed();
      expect(cartPage.checkoutButton).toBeDisplayed();
    });
  });
  describe("Check infromation with all the items added", () => {
    before(() => {
      clearSession();
      setCartItems([0, 1, 2, 3, 4, 5]);
      cartPage.open();
    });

    it("All the elements should be shown", () => {
      should(cartPage.cartItems).to.have.lengthOf(6);
    });

    it("Check products information", () => {
      cartPage.cartItems.forEach((cartItem) => {
        let expectedItem = data.getProductInformation(cartPage.getId(cartItem));
        expect(cartPage.getTitle(cartItem)).toHaveText(expectedItem.title);
        expect(cartPage.getDescription(cartItem)).toHaveText(
          expectedItem.description
        );
        expect(cartPage.getPrice(cartItem)).toHaveText(
          expectedItem.price.toString()
        );
      });
    });
    it("Check price regex", () => {
      cartPage.cartItems.forEach((cartItem) => {
        should(cartPage.getPrice(cartItem).getText()).to.match(/\d+\.\d{2}/g);
      });
    });
    it("Check QTY", () => {
      cartPage.cartItems.forEach((cartItem) => {
        expect(cartPage.getQuantity(cartItem)).toHaveText("1");
      });
    });
    it("Remove button should be present for each item", () => {
      cartPage.cartItems.forEach((cartItem) => {
        expect(cartPage.getRemoveButton(cartItem)).toBeDisplayed();
        expect(cartPage.getRemoveButton(cartItem)).toHaveText("REMOVE");
      });
    });
  });
});
