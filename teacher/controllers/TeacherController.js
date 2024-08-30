const TeacherModel = require("../../common/models/TEACHER");

module.exports = {

  getTeacher: (req, res) => {
    const {
      user: { teacherId },
    } = req;

    TeacherModel.findTeacher({ id: teacherId })
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
  },
  updateTeacher: (req, res) => {
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

    TeacherModel.updateTeacher({ id: userId }, payload)
      .then(() => {
        return TeacherModel.findTeacher({ id: userId });
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
  },

  deleteTeacher: (req, res) => {
    const {
      params: { userId },
    } = req;

    TeacherModel.findTeacher({ id: userId }).then((user) => {
      if (user) {
        TeacherModel.deleteTeacher({ id: userId })
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
  },

  getAllTeachers: (req, res) => {
    TeacherModel.findAllTeachers(req.query)
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
  },
};
