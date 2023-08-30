const { ctrlWrapper, HttpError } = require("../../helpers");
const { User } = require("../../models/user");

const subscriptionUpdate = async (req, res) => {
  const { _id } = req.user;
  const { subscription } = req.body;

  if (!subscription) throw HttpError(400, "missing field subscription");
  const user = await User.findByIdAndUpdate(
    _id,
    { subscription },
    { new: true }
  );
  res.json(user);
};

module.exports = ctrlWrapper(subscriptionUpdate);
