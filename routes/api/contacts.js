const express = require("express");

const { schemas } = require("../../models/contact");

const { validateBody, isValidId } = require("../../middlewares");

const router = express.Router();

const control = require("../../controllers/contacts");

router.get("/", control.listContacts);

router.get("/:contactId", isValidId, control.getContactById);

router.post("/", validateBody(schemas.addSchema), control.addContact);

router.delete("/:contactId", isValidId, control.removeContact);

router.put(
  "/:contactId",
  isValidId,
  validateBody(schemas.addSchema),
  control.updateContact
);
router.patch(
  "/:contactId/favorite",
  isValidId,
  validateBody(schemas.updateFavoriteSchema),
  control.updateStatusContact
);

module.exports = router;
