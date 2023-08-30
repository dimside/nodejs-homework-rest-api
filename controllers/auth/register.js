const { User } = require("../../models/user");
const { HttpError, ctrlWrapper } = require("../../helpers");
const bcrypt = require("bcrypt");
const gravatar = require('gravatar')

const register = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) throw HttpError(409, "Email in use");

  const hashedPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email);
  
  const newUser = await User.create({
    ...req.body,
    password: hashedPassword,
    avatarURL,
  });
  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
      avatarURL: newUser.avatarURL,
    },
  });
};

module.exports = ctrlWrapper(register);
