import AdminModel from "../../common/models/ADMIN.js";
import { roles } from "../../config.js";


import {connection} from "../../src/connection.js"
// MySQL bağlantısını kur
const sequelize = connection
const adminModel= new AdminModel(sequelize)

class AdminController {
  getUser (req, res) {
    const {
      user: { userId },
    } = req;

    adminModel.findUser({ id: userId })
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
  updateUser (req, res) {
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

    adminModel.updateUser({ id: userId }, payload)
      .then(() => {
        return adminModel.findUser({ id: userId });
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

  deleteUser(req, res)  {
    const {
      params: { userId },
    } = req;

    adminModel.findUser({ id: userId }).then((user) => {
      if (user) {
        adminModel.deleteUser({ id: userId })
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

  getAllUsers (req, res)  {
    adminModel.findAllUsers(req.query)
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

  changeRole (req, res)  {
    const {
      params: { userId },
      body: { role },
    } = req;

    adminModel.updateUser({ id: userId }, { role })
      .then(() => {
        return adminModel.findUser({ id: userId });
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

  approveUser (req, res)  {
    const {
      params: { userId },
      body: { role },
    } = req;
    if (role == roles.ADMIN) {
      return res.status(401).json({
        status: false,
        message: "You need to be super admin to approve admin user",
      });
    }

    adminModel.approveUser({ id: userId }, { role })
      .then(() => {
        return res.status(200).json({
          status: true,
        });
      })
      .catch((err) => {
        return res.status(500).json({
          status: false,
          error: err,
        });
      });
  }

  deactiveUser (req, res) {
    const {
      params: { userId },
      body: { role },
    } = req;

    if (role == roles.ADMIN) {
      return res.status(401).json({
        status: false,
        message: "You need to be super admin to deactivate admin user",
      });
    }

    adminModel.deactivateUser({ id: userId }, { role })
      .then(() => {
        return res.status(200).json({
          status: true,
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

export default AdminController
