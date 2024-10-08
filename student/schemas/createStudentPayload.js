import { roles } from "../../config.js";

export const createSstudentPayload={
  type: "object",
  properties: {
    username: {
      type: "string",
    },
    email: {
      type: "string",
      pattern: "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$",
    },
    password: {
      type: "string",
    },
    firstName: {
      type: "string",
    },
    lastName: {
      type: "string",
    },
    role: {
      type: "string",
      default: roles.TEACHER,
    },
  },
  required: [
    "username", 
    "email", 
    "password", 
    "firstName", 
    "lastName"
  ],
  additionalProperties: false,
};
