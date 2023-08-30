const router = require("express").Router();

const { validateBody, authenticate, upload } = require("../../middlewares");
const { schemas } = require("../../models/user");

const controller = require("../../controllers/auth");

router.post(
  "/register",
  validateBody(schemas.registerSchema),
  controller.register
);

router.get("/login", validateBody(schemas.loginSchema), controller.login);

router.get("/current", authenticate, controller.getCurrent);

router.post("/logout", authenticate, controller.logout);

router.patch("/avatars", authenticate, upload.single("avatar"), controller.avatarUpdate);

router.patch(
  "/",
  authenticate,
  validateBody(schemas.updateSubscriptionSchema),
  controller.subscriptionUpdate
);

module.exports = router;
