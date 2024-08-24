const UserModel = require("../../models/USER");

module.exports = {
  register: (req, res) => {
    const body = req.body;
    res.status(200).json({
      status: true,
      data: {
        user: "login",
        userEmail: body.email,
        userPassword: body.password,
      },
    });
    UserModel.createUser(body);
  },
  getAllUser: async (_, res) => {
    const user = await UserModel.findAllUser();

    return res.status(200).json({
      status: true,
      data: {user},
    });
  },
};
