const router = require("express").Router();

// Middleware Imports
const isAuthenticatedMiddleware = require("../common/middlewares/IsAuthenticatedMiddleware");
const SchemaValidationMiddleware = require("../common/middlewares/SchemaValidationMiddleware");
const CheckPermissionMiddleware = require("../common/middlewares/CheckPermission");

// Controller Imports
const StudentController = require("../student/controllers/StudentController");
const AuthorizationController = require("../authorization/controllers/AuthorizationController");

// JSON Schema Imports for payload verification
const createSstudentPayload = require('./schemas/createStudentPayload')
const updateStudentPayload = require("./schemas/updateStudentPayload");

const { roles } = require("../config");

router.post(
  "/create",
  [SchemaValidationMiddleware.verify(createSstudentPayload)],
  AuthorizationController.register
);

router.get(
  "/all",
  [isAuthenticatedMiddleware.check, CheckPermissionMiddleware.has(roles.ADMIN)],
  StudentController.getAllStudents
);

router.get(
  "/:studentId",
  [isAuthenticatedMiddleware.check],
  StudentController.getStudent
);

router.patch(
  "/",
  [
    isAuthenticatedMiddleware.check,
    SchemaValidationMiddleware.verify(updateStudentPayload),
  ],
  StudentController.updateStudent
);



router.delete(
  "/delete-user/:studentId",
  [isAuthenticatedMiddleware.check, CheckPermissionMiddleware.has(roles.ADMIN)],
  StudentController.deleteStudent
);

module.exports = router;
