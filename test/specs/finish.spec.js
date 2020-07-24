const { clearSession } = require("../../utils/app");
const finishPage = require("../../pages/finish.page");

describe("Finish page tests", () => {
  beforeEach(() => {
    clearSession();
    finishPage.open();
  });
  it("Checking title", () => {
    expect(finishPage.header).toHaveText("THANK YOU FOR YOUR ORDER");
  });
  it("Checking text", () => {
    expect(finishPage.text).toHaveText(
      "Your order has been dispatched, and will arrive just as fast as the pony can get there!"
    );
  });
  it("Checking image container is shown", () => {
    expect(finishPage.image).toBeDisplayed();
  });
});
