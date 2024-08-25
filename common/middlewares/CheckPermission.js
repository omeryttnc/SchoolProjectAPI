const UserModel = require("../models/User");

module.exports = {
  has: (role) => {
    return (req, res, next) => {
      const {
        user: { userId },
      } = req;
      UserModel.findUser({ id: userId }).then((user) => {
        if (!user) {
          return res.status(403).json({
            status: false,
            error: " Invalid access token provided",
          });
        }
        const userRole = user.role;
        if (userRole != role) {
          return res.status(403).json({
            status: false,
            error: `You need to be a ${role} to access this end point`,
          });
        }
        next();
      });
    };
  },
};
