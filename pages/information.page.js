const BasePage = require("./base.page");

class InformationPage extends BasePage {
  constructor() {
    super();
    this.path = "/checkout-step-one.html";
  }
  get checkoutInfo() {
    return $(".checkout_info");
  }
  get firstNameInput() {
    return $("#first-name");
  }
  get lastNameInput() {
    return $("#last-name");
  }
  get postalCodeInput() {
    return $("#postal-code");
  }
  get continueButton() {
    return $(".cart_button");
  }
  get cancelButton() {
    return $(".cart_cancel_link");
  }
  get errorMessage() {
    return $("h3[data-test=error]");
  }
  get errorMessageButton() {
    return $(".error-button");
  }
  fillUserInfo(user) {
    this.firstNameInput.setValue(user.firstName);
    this.lastNameInput.setValue(user.lastName);
    this.postalCodeInput.setValue(user.zipCode);
  }
  continue() {
    this.continueButton.click();
  }
}

module.exports = new InformationPage();
