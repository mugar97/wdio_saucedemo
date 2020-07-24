const { clearSession, setCartItems } = require("../../utils/app");
const checkoutPage = require("../../pages/checkout.page");
const data = require("../../utils/data");

describe("Checkout page tests", () => {
  [
    {
      testName: "without items",
      beforeFunction: () => {
        clearSession();
        checkoutPage.open();
      },
    },
    {
      testName: "with items",
      beforeFunction: () => {
        clearSession();
        setCartItems([0, 3, 5]);
        checkoutPage.open();
      },
    },
  ].forEach((testCase) => {
    describe(`Checkout page common validations: ${testCase.testName}`, () => {
      beforeEach(testCase.beforeFunction);
      it("Check values format", () => {
        should(checkoutPage.paymentInformationCode.getText()).to.match(
          /^(SauceCard #\d{5})$/g
        );
        should(checkoutPage.getSummarySubtotal()).to.match(
          /^(\$\d+(\.\d{1,2})?)$/g
        );
        should(checkoutPage.getSummaryTax()).to.match(/^(\$\d+\.\d{2})$/g);
        should(checkoutPage.getSummaryTotal()).to.match(/^(\$\d+\.\d{2})$/g);
      });
      it("Check shipping information", () => {
        expect(checkoutPage.shippingInformationValue).toHaveText(
          "FREE PONY EXPRESS DELIVERY!"
        );
      });
      it("Cancel button should redirect to Inventory page", () => {
        checkoutPage.cancelButton.click();
        expect(browser).toHaveUrl("https://www.saucedemo.com/inventory.html");
      });
    });
  });
  [0, 1, 2, 3, 4, 5].forEach((id) => {
    describe("Check each item information", () => {
      before(() => {
        clearSession();
        setCartItems([id]);
        checkoutPage.open();
      });
      it("Check item information: Title, description, price, tax and quantity values", () => {
        let expectedInformation = data.getProductInformation(id);
        let summaryItem = checkoutPage.getSummaryItemById(id);
        expect(checkoutPage.getTitle(summaryItem)).toHaveText(
          expectedInformation.title
        );
        expect(checkoutPage.getDescription(summaryItem)).toHaveText(
          expectedInformation.description
        );
        should(
          checkoutPage.getPrice(summaryItem).getText().replace("$", "")
        ).to.eql(expectedInformation.price.toString());
        should(checkoutPage.summaryTax.getText().replace("Tax: $", "")).to.eql(
          expectedInformation.tax.toFixed(2)
        );
        expect(checkoutPage.getQuantity(summaryItem)).toHaveText("1");
      });
      it("Tax and price format", () => {
        let summaryItem = checkoutPage.getSummaryItemById(id);
        should(checkoutPage.getPrice(summaryItem).getText()).to.match(
          /^(\$\d+\.\d{2})$/g
        );
        should(checkoutPage.getSummaryTax()).to.match(/^(\$\d+\.\d{2})$/g);
      });
      it("Continue button should redirect to the Finish page", () => {
        checkoutPage.finishButton.click();
        expect(browser).toHaveUrl(
          "https://www.saucedemo.com/checkout-complete.html"
        );
      });
    });
  });
  [
    {
      items: [0, 1, 2, 3, 4, 5],
      subtotal: "$129.94",
      tax: "$10.40",
      total: "$140.34",
    },
    {
      items: [5, 2, 0, 4, 1, 3],
      subtotal: "$129.94",
      tax: "$10.40",
      total: "$140.34",
    },
    { items: [2, 0], subtotal: "$17.98", tax: "$1.44", total: "$19.42" },
    { items: [4, 5, 1], subtotal: "$95.97", tax: "$7.68", total: "$103.65" },
    { items: [3, 3, 1, 5], subtotal: "$97.96", tax: "$7.84", total: "$105.80" },
    {
      items: [0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5],
      subtotal: "$259.88",
      tax: "$20.80",
      total: "$280.68",
    },
  ].forEach((testCase) => {
    describe(`Check calculations in different conditions. Items: [${testCase.items}]`, () => {
      before(() => {
        clearSession();
        setCartItems(testCase.items);
        checkoutPage.open();
      });
      it("Check subtotal, tax and total values", () => {
        should(checkoutPage.getSummarySubtotal()).to.equal(testCase.subtotal);
        should(checkoutPage.getSummaryTax()).to.equal(testCase.tax);
        should(checkoutPage.getSummaryTotal()).to.equal(testCase.total);
      });
      it("Continue button should redirect to the Finish page", () => {
        checkoutPage.finishButton.click();
        expect(browser).toHaveUrl(
          "https://www.saucedemo.com/checkout-complete.html"
        );
      });
    });
  });
});
