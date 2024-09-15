import TeacherModel from "../../common/models/TEACHER.js";

import {connection} from "../../src/connection.js"
// MySQL bağlantısını kur
const sequelize = connection
const teacherModel= new TeacherModel(sequelize)

class TeacherController {

  getTeacher (req, res)  {
    const {
      params: { teacherId },
    } = req;

    teacherModel.findTeacher({ id: teacherId })
      .then((user) => {
        return res.status(200).json({
          status: true,
          data: user.toJSON(),
        });
      })
      .catch((err) => {
        return res.status(500).json({
          status: false,
          error: err,
        });
      });
  }
  updateTeacher (req, res)  {
    const {
      user: { userId },
      body: payload,
    } = req;

    // IF the payload does not have any keys,
    // THEN we can return an error, as nothing can be updated
    if (!Object.keys(payload).length) {
      return res.status(400).json({
        status: false,
        error: {
          message: "Body is empty, hence can not update the user.",
        },
      });
    }

    teacherModel.updateTeacher({ id: userId }, payload)
      .then(() => {
        return teacherModel.findTeacher({ id: userId });
      })
      .then((user) => {
        return res.status(200).json({
          status: true,
          data: user.toJSON(),
        });
      })
      .catch((err) => {
        return res.status(500).json({
          status: false,
          error: err,
        });
      });
  }

  deleteTeacher (req, res)  {
    const {
      params: { userId },
    } = req;

    teacherModel.findTeacher({ id: userId }).then((user) => {
      if (user) {
        teacherModel.deleteTeacher({ id: userId })
          .then((numberOfEntriesDeleted) => {
            return res.status(200).json({
              status: true,
              data: {
                info: numberOfEntriesDeleted + " user has deleted",
              },
            });
          })
          .catch((err) => {
            return res.status(500).json({
              status: false,
              error: err,
            });
          });
      } else {
        return res.status(404).json({
          status: false,
          data: "user is not found",
        });
      }
    });
  }

  getAllTeachers (req, res)  {
    teacherModel.findAllTeachers(req.query)
      .then((users) => {
        return res.status(200).json({
          status: true,
          data: users,
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

export default TeacherController
