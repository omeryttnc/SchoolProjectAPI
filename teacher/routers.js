const router = require("express").Router();

// Middleware Imports
const isAuthenticatedMiddleware = require("../common/middlewares/IsAuthenticatedMiddleware");
const SchemaValidationMiddleware = require("../common/middlewares/SchemaValidationMiddleware");
const CheckPermissionMiddleware = require("../common/middlewares/CheckPermission");

// Controller Imports
const TeacherController = require("../teacher/controllers/TeacherController");
const AuthorizationController = require("../authorization/controllers/AuthorizationController");

// JSON Schema Imports for payload verification
const createTacherPayload = require('./schemas/createTeacherPayload')
const updateTeacherPayload = require("./schemas/updateTeacherPayload");

const { roles } = require("../config");

router.post(
  "/create",
  [SchemaValidationMiddleware.verify(createTacherPayload)],
  AuthorizationController.register
);

router.get(
  "/",
  [isAuthenticatedMiddleware.check],
  TeacherController.getTeacher
);

router.patch(
  "/",
  [
    isAuthenticatedMiddleware.check,
    SchemaValidationMiddleware.verify(updateTeacherPayload),
  ],
  TeacherController.updateTeacher
);

router.get(
  "/all",
  [isAuthenticatedMiddleware.check, CheckPermissionMiddleware.has(roles.ADMIN)],
  TeacherController.getAllTeachers
);

router.delete(
  "/delete-user/:teacherId",
  [isAuthenticatedMiddleware.check, CheckPermissionMiddleware.has(roles.ADMIN)],
  TeacherController.deleteTeacher
);

module.exports = router;
