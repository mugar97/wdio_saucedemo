const { clearSession, USER_TYPE } = require("../../utils/app");
const loginPage = require("../../pages/login.page");
const productsPage = require("../../pages/products.page");

describe("Login screen tests", () => {
  beforeEach(() => {
    clearSession();
    loginPage.open();
  });

  [
    USER_TYPE.STANDARD_USER,
    USER_TYPE.PERFORMANCE_GLITCH_USER,
    USER_TYPE.PROBLEM_USER,
  ].forEach((user) => {
    it("Right credentials should redirect to inventory", () => {
      loginPage.loginWithCredentials(user);
      expect(productsPage.inventoryContainer).toBeDisplayed();
    });
  });

  it("Blocked user should show an error", () => {
    loginPage.loginWithCredentials(USER_TYPE.LOCKED_OUT_USER);
    expect(loginPage.errorMesage).toHaveTextContaining(
      "Sorry, this user has been locked out."
    );
  });

  [
    { username: "anything", password: "fakepass" },
    { username: USER_TYPE.STANDARD_USER, password: "wrongpass" },
    "wronguser",
  ].forEach((user) => {
    it("Wrong credentials should show an error", () => {
      loginPage.loginWithCredentials(user);
      expect(loginPage.errorMesage).toHaveTextContaining(
        "Username and password do not match any user in this service"
      );
    });
  });

  it("Empty username and password should show an error", () => {
    loginPage.loginButton.click();
    expect(loginPage.errorMesage).toHaveTextContaining("Username is required");
  });

  it("Filled username and empty password should show an error", () => {
    loginPage.usernameInput.setValue(USER_TYPE.STANDARD_USER);
    loginPage.loginButton.click();
    expect(loginPage.errorMesage).toHaveTextContaining("Password is required");
  });

  it("Empty username and filled password should show an error", () => {
    loginPage.passwordInput.setValue(USER_TYPE.PASSWORD);
    loginPage.loginButton.click();
    expect(loginPage.errorMesage).toHaveTextContaining("Username is required");
  });
});
