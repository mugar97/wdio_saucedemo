const setCartItems = function (items) {
  browser.execute((items) => {
    window.sessionStorage.setItem("cart-contents", `[${items.toString()}]`);
  }, items);
};

const getCartItems = function () {
  let items = browser.execute(() =>
    window.sessionStorage.getItem("cart-contents")
  );
  if (items == "[]") {
    return [];
  }
  return items
    .replace(/[\[\]]/g, "")
    .split(",")
    .map((x) => +x);
};

const setUser = function (user_type) {
  browser.execute((user_type) => {
    window.sessionStorage.setItem("session-username", user_type);
  }, user_type);
};

const clearSession = function () {
  if (browser.getUrl() == "data:,") {
    browser.url("/");
  }
  browser.execute(() => {
    window.sessionStorage.clear();
  });
};

const USER_TYPE = {
  LOCKED_OUT_USER: "locked_out_user",
  STANDARD_USER: "standard_user",
  PROBLEM_USER: "problem_user",
  PERFORMANCE_GLITCH_USER: "performance_glitch_user",
  PASSWORD: "secret_sauce",
};

module.exports = {
  setCartItems: setCartItems,
  getCartItems: getCartItems,
  setUser: setUser,
  clearSession: clearSession,
  USER_TYPE: USER_TYPE,
};
