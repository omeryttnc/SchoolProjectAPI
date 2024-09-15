import express from "express";
const router = express.Router();

// Middleware Imports
import IsAuthenticatedMiddleware from "../common/middlewares/IsAuthenticatedMiddleware.js" ;
import SchemaValidationMiddleware from "../common/middlewares/SchemaValidationMiddleware.js" ;
import CheckPermissionMiddleware from "../common/middlewares/CheckPermission.js" ;

// Controller Imports
import StudentController from "../student/controllers/StudentController.js" ;
import AuthorizationController from "../authorization/controllers/AuthorizationController.js" ;

// JSON Schema Imports for payload verification
import {createSstudentPayload} from './schemas/createStudentPayload.js' 
import {updateStudentPayload} from "./schemas/updateStudentPayload.js" ;

import { roles } from "../config.js" ;


const studentController =  new StudentController()
const authorizationController = new AuthorizationController()

const isAuthenticatedMiddleware = new IsAuthenticatedMiddleware()
const schemaValidationMiddleware= new SchemaValidationMiddleware()
const checkPermissionMiddleware = new CheckPermissionMiddleware()
router.post(
  "/create",
  [schemaValidationMiddleware.verify(createSstudentPayload)],
  authorizationController.register
);

router.get(
  "/all",
  [isAuthenticatedMiddleware.check, checkPermissionMiddleware.has(roles.ADMIN)],
  studentController.getAllStudents
);

router.get(
  "/:studentId",
  [isAuthenticatedMiddleware.check],
  studentController.getStudent
);

router.patch(
  "/",
  [
    isAuthenticatedMiddleware.check,
    schemaValidationMiddleware.verify(updateStudentPayload),
  ],
  studentController.updateStudent
);



router.delete(
  "/delete-user/:studentId",
  [isAuthenticatedMiddleware.check, checkPermissionMiddleware.has(roles.ADMIN)],
  studentController.deleteStudent
);

export default router;
