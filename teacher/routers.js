import express from "express";
const router = express.Router();

// Middleware Imports
import IsAuthenticatedMiddleware from "../common/middlewares/IsAuthenticatedMiddleware.js";
import SchemaValidationMiddleware from "../common/middlewares/SchemaValidationMiddleware.js";
import CheckPermissionMiddleware from "../common/middlewares/CheckPermission.js";

// Controller Imports
import TeacherController from "./controllers/TeacherController.js";
import AuthorizationController from "../authorization/controllers/AuthorizationController.js";

// JSON Schema Imports for payload verification
import {createTacherPayload} from './schemas/createTeacherPayload.js'
import {updateTeacherPayload} from "./schemas/updateTeacherPayload.js";

import { roles } from "../config.js";

const schemaValidationMiddleware= new SchemaValidationMiddleware()
const isAuthenticatedMiddleware = new IsAuthenticatedMiddleware()
const checkPermissionMiddleware = new CheckPermissionMiddleware()

const teacherController= new TeacherController()
const authorizationController = new AuthorizationController()



router.post(
  "/create",
  [schemaValidationMiddleware.verify(createTacherPayload)],
  authorizationController.register
);

router.get(
  "/all",
  [isAuthenticatedMiddleware.check, checkPermissionMiddleware.has(roles.ADMIN)],
  teacherController.getAllTeachers
);

router.get(
  "/:teacherId",
  [isAuthenticatedMiddleware.check],
  teacherController.getTeacher
);

router.patch(
  "/update",
  [
    isAuthenticatedMiddleware.check,
    schemaValidationMiddleware.verify(updateTeacherPayload),
  ],
  teacherController.updateTeacher
);


router.delete(
  "/delete-user/:teacherId",
  [isAuthenticatedMiddleware.check, checkPermissionMiddleware.has(roles.ADMIN)],
  teacherController.deleteTeacher
);

export default router;
