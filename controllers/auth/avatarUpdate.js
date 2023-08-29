const { ctrlWrapper, HttpError } = require("../../helpers");
const { User } = require("../../models/user");
const fs = require("fs");
const path = require("path");
const Jimp = require("Jimp");

const avatarsDir = path.join(__dirname, "..", "..", "public", "avatars");

const avatarUpdate = async (req, res, next) => {
  const { _id } = req.user;
  const { path: tempDir, originalname } = req.file;

  const fileName = `${_id}_${originalname}`;
  const destinationPath = path.join(avatarsDir, fileName);

  fs.renameSync(tempDir, destinationPath);
  try {
    await Jimp.read(destinationPath).then((image) => {
      image.resize(250, 250);
      image.write(destinationPath);
    });
  } catch (error) {
    console.log(error);
  }

  const avatarURL = path.join("avatars", fileName);

  const result = await User.findByIdAndUpdate(_id, { avatarURL });
  res.json({ avatarURL: result.avatarURL });
};

module.exports = ctrlWrapper(avatarUpdate);
