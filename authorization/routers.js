import express from "express";
const router = express.Router();

// Controller Imports
import AuthorizationController from "./controllers/AuthorizationController.js";

// Middleware Imports
import SchemaValidationMiddleware from "../common/middlewares/SchemaValidationMiddleware.js";

// JSON Schema Imports for payload verification
import registerPayload from "./schema/registerPayload.js";
import loginPayload from "./schema/loginPayload.js";

const schemas= new SchemaValidationMiddleware()
const controller = new AuthorizationController()

router.post(
  "/auth/register",
  [schemas.verify(registerPayload)],
  controller.register
);

router.post(
  "/login",
  [schemas.verify(loginPayload)],
  controller.login
);

export default router;
