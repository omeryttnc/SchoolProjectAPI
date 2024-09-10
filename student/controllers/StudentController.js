const StudentModel = require("../../common/models/STUDENT");

module.exports = {

  getStudent: (req, res) => {
    const {
      params: { studentId },
    } = req;
    StudentModel.findStudent({ id: studentId })
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
  updateStudent: (req, res) => {
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

    StudentModel.updateStudent({ id: userId }, payload)
      .then(() => {
        return StudentModel.findStudent({ id: userId });
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

  deleteStudent: (req, res) => {
    const {
      params: { userId },
    } = req;

    StudentModel.findStudent({ id: userId }).then((user) => {
      if (user) {
        StudentModel.deleteStudent({ id: userId })
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

  getAllStudents: (req, res) => {
    console.log("all student");
    StudentModel.findAllStudents(req.query)
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
