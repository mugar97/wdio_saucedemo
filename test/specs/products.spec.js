const { clearSession, setCartItems, getCartItems } = require("../../utils/app");
const productsPage = require("../../pages/products.page");
const product = require("../../model/product");
const data = require("../../utils/data");

describe("Products inventory tests", () => {
  beforeEach(() => {
    clearSession();
  });
  describe("Products inventory filters", () => {
    const EXPECTED_ORDER = {
      NAME_A_TO_Z: [4, 0, 1, 5, 2, 3],
      NAME_Z_TO_A: [3, 2, 5, 1, 0, 4],
      PRICE_LOW_TO_HIGH: [2, 0, 1, 3, 4, 5],
      PRICE_HIGH_TO_LOW: [5, 4, 3, 1, 0, 2],
    };

    beforeEach(() => {
      productsPage.open();
    });
    it("Inventory should load 6 products sort from A to Z", () => {
      let productsArray = productsPage.getProductsArray();
      should(productsArray.length).to.equal(6);
      let order = productsArray.map((p) => p.id);
      should(order).to.eql(EXPECTED_ORDER.NAME_A_TO_Z);
    });

    [
      {
        description: "NAME_A_TO_Z",
        filterOption: productsPage.sortBy.NAME_A_TO_Z,
        expectedOrder: EXPECTED_ORDER.NAME_A_TO_Z,
      },
      {
        description: "NAME_Z_TO_A",
        filterOption: productsPage.sortBy.NAME_Z_TO_A,
        expectedOrder: EXPECTED_ORDER.NAME_Z_TO_A,
      },
      {
        description: "PRICE_LOW_TO_HIGH",
        filterOption: productsPage.sortBy.PRICE_LOW_TO_HIGH,
        expectedOrder: EXPECTED_ORDER.PRICE_LOW_TO_HIGH,
      },
      {
        description: "PRICE_HIGH_TO_LOW",
        filterOption: productsPage.sortBy.PRICE_HIGH_TO_LOW,
        expectedOrder: EXPECTED_ORDER.PRICE_HIGH_TO_LOW,
      },
    ].forEach((testData) => {
      it(`Filtering by ${testData.description}`, () => {
        productsPage.filterBy(testData.filterOption);
        let order = productsPage.getProductsArray().map((p) => p.id);
        should(order).to.eql(testData.expectedOrder);
      });
    });
  });
  describe("Product item information", () => {
    beforeEach(() => {
      productsPage.open();
    });
    [0, 1, 2, 3, 4, 5].forEach((id) => {
      describe("Checking descriptive information", () => {
        let currentProduct;
        beforeEach(() => {
          currentProduct = productsPage.getProductBoxByID(id);
        });
        it("Product information should be shown", () => {
          let actualProduct = new product(
            productsPage.getProductObject(currentProduct)
          );
          let expectedProduct = new product(data.getProductInformation(id));
          should(actualProduct.title).to.eql(expectedProduct.title);
          should(actualProduct.description).to.eql(expectedProduct.description);
          should(+actualProduct.price).to.eql(+expectedProduct.price);
        });
        it("Price should match with the regex", () => {
          should(
            productsPage.getProductPrice(currentProduct).getText()
          ).to.match(/\$\d+\.\d{2}/g);
        });
      });
    });
  });

  describe("Product cart without preloaded items", () => {
    it("The cart should start empty and without a badge", () => {
      productsPage.open();
      expect(productsPage.shoppingCartBadge).not.toBeDisplayed();
    });
    it("The cart should redirect to Cart page", () => {
      productsPage.open();
      productsPage.cartButton.click();
      expect(browser).toHaveUrl("https://www.saucedemo.com/cart.html");
    });
    [0, 1, 2, 3, 4, 5].forEach((id) => {
      describe("Add and Remove", () => {
        let currentProduct;
        beforeEach(() => {
          productsPage.open();
          currentProduct = productsPage.getProductBoxByID(id);
        });
        it("Add button should start in 'ADD TO CART' text, add the item to the cart, and turn to 'REMOVE'", () => {
          expect(
            productsPage.getProductAddToCartButton(currentProduct)
          ).toHaveText("ADD TO CART");
          productsPage.addProductToCart(currentProduct);
          expect(
            productsPage.getProductAddToCartButton(currentProduct)
          ).toHaveText("REMOVE");
          expect(productsPage.shoppingCartBadge).toBeDisplayed();
          expect(productsPage.shoppingCartBadge).toHaveText("1");
          should(getCartItems()).to.have.lengthOf(1).that.to.include(id);
        });
        it("Remove button should remove the item from the cart after being added by click, and turn from 'REMOVE' to 'ADD TO CART'", () => {
          productsPage.addProductToCart(currentProduct);
          productsPage.getProductAddToCartButton(currentProduct).click();
          expect(
            productsPage.getProductAddToCartButton(currentProduct)
          ).toHaveText("ADD TO CART");
          expect(productsPage.shoppingCartBadge).not.toBeDisplayed();
          console.log(getCartItems());
          should(getCartItems()).to.be.empty;
        });
      });
    });

    describe("Product cart with preloaded items", () => {
      let addedItems = [4, 1];
      let notAddedItems = [0, 2, 3, 5];
      beforeEach(() => {
        setCartItems(addedItems);
        productsPage.open();
      });
      it("The cart should show preloaded items", () => {
        expect(productsPage.shoppingCartBadge).toBeDisplayed();
        expect(productsPage.shoppingCartBadge).toHaveText("2");
      });
      it("The cart should redirect to Cart page", () => {
        productsPage.open();
        productsPage.cartButton.click();
        expect(browser).toHaveUrl("https://www.saucedemo.com/cart.html");
      });
      it("The remove button should be active when a product is previously added", () => {
        addedItems.forEach((item) => {
          expect(
            productsPage.getProductAddToCartButton(
              productsPage.getProductBoxByID(item)
            )
          ).toHaveText("REMOVE");
        });
        notAddedItems.forEach((item) => {
          expect(
            productsPage.getProductAddToCartButton(
              productsPage.getProductBoxByID(item)
            )
          ).toHaveText("ADD TO CART");
        });
      });
      addedItems.forEach((item) => {
        it("Remove button should remove a previously added item from the cart", () => {
          productsPage
            .getProductAddToCartButton(productsPage.getProductBoxByID(item))
            .click();
          expect(productsPage.shoppingCartBadge).toBeDisplayed();
          expect(productsPage.shoppingCartBadge).toHaveText("1");
          should(getCartItems()).to.have.lengthOf(1).that.not.include(item);
        });
      });
    });
  });
});
