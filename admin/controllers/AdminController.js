const AdminModel = require("../../common/models/ADMIN");

module.exports = {
  getUser: (req, res) => {
    const {
      user: { userId },
    } = req;

    AdminModel.findUser({ id: userId })
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
  updateUser: (req, res) => {
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

    AdminModel.updateUser({ id: userId }, payload)
      .then(() => {
        return AdminModel.findUser({ id: userId });
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

  deleteUser: (req, res) => {
    const {
      params: { userId },
    } = req;

    AdminModel.findUser({ id: userId }).then((user) => {
      if (user) {
        AdminModel.deleteUser({ id: userId })
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

  getAllUsers: (req, res) => {
    AdminModel.findAllUsers(req.query)
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

  changeRole: (req, res) => {
    const {
      params: { userId },
      body: { role },
    } = req;

    AdminModel.updateUser({ id: userId }, { role })
      .then(() => {
        return AdminModel.findUser({ id: userId });
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

  approveUser: (req, res) => {
    const {
      params: { userId },
      body: { role },
    } = req;

    AdminModel.moveUser({ id: userId }, { role })
    .then(() => {
      return res.status(200).json({
        status: true
      });
    });
  },
};
