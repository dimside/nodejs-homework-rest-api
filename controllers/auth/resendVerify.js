const { ctrlWrapper, HttpError } = require("../../helpers");
const { User } = require("../../models/user");
const sendMail = require("../../services/sendMail");
const { BASE_URL } = process.env;

const resendVerify = async (req, res, next) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    throw HttpError(404, "User not found");
  }

  if (user.verify) {
    throw HttpError(400, "Verification has already been passed");
  }

  const verifyEmail = {
    to: email,
    subject: "Verify email.",
    html: `
    <p>To confirm registration please click link below:</p> 
    <a href="${BASE_URL}/api/auth/users/verify/${user.verificationToken}">Click for verify</a>
    `,
  };

  await sendMail(verifyEmail);

  res.json({ message: "Verification email sent" });
};

module.exports = ctrlWrapper(resendVerify);
