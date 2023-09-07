const register = require("./register");
const login = require("./login");
const getCurrent = require("./getCurrent");
const logout = require("./logout");
const subscriptionUpdate = require("./subscriptionUpdate");
const avatarUpdate = require("./avatarUpdate");
const verifyEmail = require("./verifyEmail");
const resendVerify = require("./resendVerify");

module.exports = {
  register,
  login,
  getCurrent,
  logout,
  subscriptionUpdate,
  avatarUpdate,
  verifyEmail,
  resendVerify,
};
