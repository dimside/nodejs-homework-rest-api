const { Contact } = require("../../models/contact");

const { ctrlWrapper } = require("../../helpers");

const listContacts = async (req, res) => {
  const { _id: owner } = req.user;
  console.log(req.query);
  const { page = 1, limit = 10, favorite } = req.query;
  const skip = (page - 1) * limit;

  const result = await Contact.find(
    favorite ? { owner, favorite } : { owner },
    "",
    { skip, limit }
  );
  res.json(result);
};

module.exports = ctrlWrapper(listContacts);
