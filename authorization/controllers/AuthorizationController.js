import jwt from "jsonwebtoken";
import crypto from "crypto";

import AdminModel from "../../common/models/ADMIN.js";
import TeacherModel from "../../common/models/TEACHER.js";
import StudentModel from "../../common/models/STUDENT.js";

import { roles, config } from "../../config.js";

import {connection} from "../../src/connection.js"
// MySQL bağlantısını kur
const sequelize = connection
const adminModel= new AdminModel(sequelize)
const teacherModel= new TeacherModel(sequelize)
const studentModel= new StudentModel(sequelize)

// Generates an Access Token using username and userId for the user's authentication
const generateAccessToken = (username, userId) => {
  return jwt.sign(
    {
      userId,
      username,
    },
    config.jwtSecret,
    {
      expiresIn: config.jwtExpirationInSeconds,
    }
  );
};

// Encrypts the password using SHA256 Algorithm, for enhanced security of the password
const encryptPassword = (password) => {
  // We will hash the password using SHA256 Algorithm before storing in the DB
  // Creating SHA-256 hash object
  const hash = crypto.createHash("sha256");
  // Update the hash object with the string to be encrypted
  hash.update(password);
  // Get the encrypted value in hexadecimal format
  return hash.digest("hex");
};

class AuthorizationController {
   register (req, res)  {
    const payload = req.body;
    let encryptedPassword = encryptPassword(payload.password);
    let role = payload.role;

    if (!role) {
      role = roles.STUDENT;
    }

    // for Admin user
    if (role == roles.ADMIN) {
      adminModel.createUser(
        Object.assign(payload, { password: encryptedPassword, role })
      )
        .then((user) => {
          // Generating an AccessToken for the user, which will be
          // required in every subsequent request.
          const accessToken = generateAccessToken(payload.username, user.id);

          return res.status(200).json({
            status: true,
            data: {
              user: user.toJSON(),
              token: accessToken,
            },
          });
        })
        .catch((err) => {
          return res.status(500).json({
            status: false,
            error: err,
          });
        });
    }
    // for Teacher
    else if (role == roles.TEACHER) {
      teacherModel.createTeacher(
        Object.assign(payload, { password: encryptedPassword, role })
      )
        .then((user) => {
          // Generating an AccessToken for the user, which will be
          // required in every subsequent request.
          const accessToken = generateAccessToken(payload.username, user.id);

          return res.status(200).json({
            status: true,
            data: {
              user: user.toJSON(),
              token: accessToken,
            },
          });
        })
        .catch((err) => {
          return res.status(500).json({
            status: false,
            error: err,
          });
        });
    }
    // for Student
    else {
      studentModel.createStudent(
        Object.assign(payload, { password: encryptedPassword, role })
      )
        .then((user) => {
          // Generating an AccessToken for the user, which will be
          // required in every subsequent request.
          const accessToken = generateAccessToken(payload.username, user.id);

          return res.status(200).json({
            status: true,
            data: {
              user: user.toJSON(),
              token: accessToken,
            },
          });
        })
        .catch((err) => {
          return res.status(500).json({
            status: false,
            error: err,
          });
        });
    }
  }

  login (req, res)  {

    const { username, password, role } = req.body;

    adminModel.findUser({ username })
      .then((user) => {
        // IF user is not found with the given username
        // THEN Return user not found error
        if (!user) {
          return res.status(400).json({
            status: false,
            error: {
              message: `Could not find any user with username: \`${username}\`.`,
            },
          });
        }

        const encryptedPassword = encryptPassword(password);

        // IF Provided password does not match with the one stored in the DB
        // THEN Return password mismatch error
        if (user.password !== encryptedPassword) {
          return res.status(400).json({
            status: false,
            error: {
              message: `Provided username and password did not match.`,
            },
          });
        }

        // IF Provided user does not match with the one stored in the DB
        // THEN Return mismatch error
        if (user.role !== role) {
          return res.status(400).json({
            status: false,
            error: {
              message: "user role not correct",
            },
          });
        }

        // user must be approved
        if (!user.approved) {
          return res.status(400).json({
            status: false,
            data: {
              message: "user should be approved",
            },
          });
        }

        // Generating an AccessToken for the user, which will be
        // required in every subsequent request.
        const accessToken = generateAccessToken(user.username, user.id);
        res.cookie("token", accessToken, {
          httpOnly: true,
          // secure:true,
          //maxAge:100000,
          // signed:true
        });

        return res.status(200).json({
          status: true,
          data: {
            user: {
              id: user.id,
              username: user.username,
              firstName: user.firstName,
              lastName: user.lastName,
              email: user.email,
              role: user.role,
              isApproved: user.approved,
            },
            token: accessToken,
          },
        });
      })
      .catch((err) => {
        return res.status(500).json({
          status: false,
          error: err,
        });
      });
  }
};

export default AuthorizationController;
