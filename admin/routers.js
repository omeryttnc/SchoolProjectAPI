import express from "express";
const router = express.Router();

// Middleware Imports
import IsAuthenticatedMiddleware from "../common/middlewares/IsAuthenticatedMiddleware.js";
import SchemaValidationMiddleware from "../common/middlewares/SchemaValidationMiddleware.js";
import CheckPermissionMiddleware from "../common/middlewares/CheckPermission.js";

// Controller Imports
import  AdminController  from "../admin/controllers/AdminController.js";

// JSON Schema Imports for payload verification
import updateUserPayload from "./schemas/updateUserPayload.js";
import changeRolePayload from "./schemas/changeRolePayload.js";

import  {roles}  from "../config.js";

const adminController =  new AdminController()

const isAuthenticatedMiddleware = new IsAuthenticatedMiddleware()
const schemaValidationMiddleware= new SchemaValidationMiddleware()
const checkPermissionMiddleware = new CheckPermissionMiddleware()

router.get("/", [isAuthenticatedMiddleware.check], adminController.getUser);

router.patch(
  "/",
  [
    isAuthenticatedMiddleware.check,
    schemaValidationMiddleware.verify(updateUserPayload),
  ],
  adminController.updateUser
);

router.get(
  "/all",
  [isAuthenticatedMiddleware.check, checkPermissionMiddleware.has(roles.ADMIN)],
  adminController.getAllUsers
);

router.patch(
  "/change-role/:userId",
  [
    isAuthenticatedMiddleware.check,
    checkPermissionMiddleware.has(roles.ADMIN),
    schemaValidationMiddleware.verify(changeRolePayload),
  ],
  adminController.changeRole
);

router.delete(
  "/delete-user/:userId",
  [isAuthenticatedMiddleware.check, checkPermissionMiddleware.has(roles.ADMIN)],
  adminController.deleteUser
);

router.patch(
  '/approve/:userId',
  [isAuthenticatedMiddleware.check, checkPermissionMiddleware.has(roles.ADMIN)],
 adminController.approveUser
)
router.patch(
  '/deactivate/:userId',
  [isAuthenticatedMiddleware.check, checkPermissionMiddleware.has(roles.ADMIN)],
 adminController.deactiveUser
)
// TODO: super admin create
export default router;
