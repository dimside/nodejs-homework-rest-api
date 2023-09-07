const { HttpError, ctrlWrapper } = require("../../helpers");
const { User } = require("../../models/user");

const verifyEmail = async (req, res, next) => {
  const { verificationToken } = req.params;

  const user = await User.findOneAndUpdate(
    { verificationToken },
    { verify: true, verificationToken: null }
  );

  if (!user) {
    throw HttpError(404, "User not found");
  }

  res.json({ message: "Verification successful" });
};

module.exports = ctrlWrapper(verifyEmail);
