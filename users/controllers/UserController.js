const UserModel = require("../../common/models/User");

module.exports = {
 

  findUser: async (req, res) => {
    const body = req.body;

    const user = await UserModel.findUser(body.iduser);
    if (user.length == 0) {
      return res.status(404).json({
        status:false,
        ref: "user is not found"
      })
    }
    return res.status(202).json({
      status: true,
      user: { user },
    });
  },

  getAllUser: async (_, res) => {
    const user = await UserModel.findAllUser();

    return res.status(200).json({
      status: true,
      data: { user },
    });
  },

  deleteUser: async (req, res) => {
    const iduser = req.body.iduser;
    const user = await UserModel.findUser(iduser);
    if (user.length == 0) {
      return res.status(404).json({
        status:false,
        ref: "user is not found"
      })
    }
    UserModel.deleteUser(iduser);

    return res.status(200).json({
      status: true,
      ref: "user deleted",
    });
  },
};
