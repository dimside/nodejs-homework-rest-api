const { User } = require("../../models/user");
const { HttpError, ctrlWrapper } = require("../../helpers");
const bcrypt = require("bcrypt");
const gravatar = require("gravatar");
const crypto = require("node:crypto");
const sendMail = require("../../services/sendMail");
const { BASE_URL } = process.env;

const register = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) throw HttpError(409, "Email in use");

  const hashedPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email);
  const verificationToken = crypto.randomUUID();

  const newUser = await User.create({
    ...req.body,
    password: hashedPassword,
    avatarURL,
    verificationToken,
  });

  const verifyEmail = {
    to: email,
    subject: "Verify email.",
    html: `
    <p>To confirm registration please click link below:</p> 
    <a href="${BASE_URL}/api/auth/users/verify/${verificationToken}">Click for verify</a>
    `,
  };

  await sendMail(verifyEmail);

  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
      avatarURL: newUser.avatarURL,
    },
  });
};

module.exports = ctrlWrapper(register);
