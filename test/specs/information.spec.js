const { clearSession, setCartItems } = require("../../utils/app");
const informationPage = require("../../pages/information.page");

describe("User Information form tests", () => {
  const user = { firstName: "John", lastName: "Doe", zipCode: "90210" };
  const errorMessage = {
    FIRST_NAME: "Error: First Name is required",
    LAST_NAME: "Error: Last Name is required",
    ZIP_CODE: "Error: Postal Code is required",
  };
  beforeEach(() => {
    clearSession();
    setCartItems([5, 0, 1]);
    informationPage.open();
  });
  it("Cancel button should redirect to the cart", () => {
    informationPage.cancelButton.click();
    expect(browser).toHaveUrl("https://www.saucedemo.com/cart.html");
  });
  it("Continue button should redirect to the step two of the checkout when the information is filled", () => {
    informationPage.fillUserInfo(user);
    informationPage.continueButton.click();
    expect(browser).toHaveUrl(
      "https://www.saucedemo.com/checkout-step-two.html"
    );
  });
  [
    { testName: "No data", errorMessage: errorMessage.FIRST_NAME },
    {
      testName: "Only zipcode",
      zipCode: user.zipCode,
      errorMessage: errorMessage.FIRST_NAME,
    },
    {
      testName: "Only last name",
      lastName: user.lastName,
      errorMessage: errorMessage.FIRST_NAME,
    },
    {
      testName: "No first name",
      lastName: user.lastName,
      zipCode: user.zipCode,
      errorMessage: errorMessage.FIRST_NAME,
    },
    {
      testName: "Only first name",
      firstName: user.firstName,
      errorMessage: errorMessage.LAST_NAME,
    },
    {
      testName: "No last name",
      firstName: user.firstName,
      zipCode: user.zipCode,
      errorMessage: errorMessage.LAST_NAME,
    },
    {
      testName: "No zip code",
      firstName: user.firstName,
      lastName: user.lastName,
      errorMessage: errorMessage.ZIP_CODE,
    },
  ].forEach((testCase) => {
    it(`Error message when the user clicks on Continue: ${testCase.testName}`, () => {
      if (testCase.firstName)
        informationPage.firstNameInput.setValue(testCase.firstName);
      if (testCase.lastName)
        informationPage.lastNameInput.setValue(testCase.lastName);
      if (testCase.zipCode)
        informationPage.postalCodeInput.setValue(testCase.zipCode);
      informationPage.continueButton.click();
      expect(informationPage.errorMessage).toBeDisplayed();
      expect(informationPage.errorMessage).toHaveText(testCase.errorMessage);
      informationPage.errorMessageButton.click();
      expect(informationPage.errorMessage).not.toBeDisplayed();
    });
  });
});
