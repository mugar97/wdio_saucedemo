const BasePage = require("./base.page");
const { USER_TYPE } = require("../utils/app");

class LoginPage extends BasePage {
  constructor() {
    super();
  }
  get usernameInput() {
    return $("input[data-test='username']");
  }
  get passwordInput() {
    return $("input[data-test='password']");
  }
  get loginButton() {
    return $("#login-button");
  }
  get errorMesage() {
    return $("h3[data-test='error']");
  }
  open() {
    browser.url("https://www.saucedemo.com/");
  }

  loginWithCredentials(user) {
    if (typeof user != "object") {
      user = {
        username: user,
        password: USER_TYPE.PASSWORD,
      };
    }
    this.usernameInput.setValue(user.username);
    this.passwordInput.setValue(user.password);
    this.loginButton.click();
  }
}

module.exports = new LoginPage();
