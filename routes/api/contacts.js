const express = require("express");

const { schemas } = require("../../models/contact");

const { validateBody, isValidId, authenticate } = require("../../middlewares");

const router = express.Router();

const controller = require("../../controllers/contacts/index");

router.get("/", authenticate, controller.listContacts);

router.get("/:contactId", authenticate, isValidId, controller.getContactById);

router.post(
  "/",
  authenticate,
  validateBody(schemas.addSchema),
  controller.addContact
);

router.delete("/:contactId", authenticate, isValidId, controller.removeContact);

router.put(
  "/:contactId",
  isValidId,
  validateBody(schemas.addSchema),
  controller.updateContact
);
router.patch(
  "/:contactId/favorite",
  isValidId,
  validateBody(schemas.updateFavoriteSchema),
  controller.updateStatusContact
);

module.exports = router;
