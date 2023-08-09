const express = require("express");

const  schema  = require("../../schema/contacts");

const { validateBody } = require("../../middlewares");

const router = express.Router();

const control = require("../../controllers/contacts");

router.get("/", control.listContacts);

router.get("/:contactId", control.getContactById);

router.post("/", validateBody(schema.addSchema), control.addContact);

router.delete("/:contactId", control.removeContact);

router.put("/:contactId", validateBody(schema.addSchema), control.updateContact);

module.exports = router;
