import AdminModel from "../models/ADMIN.js" ;

import {connection} from "../../src/connection.js"
// MySQL bağlantısını kur
const sequelize = connection
const adminModel= new AdminModel(sequelize)


class CheckPermission {
  has (role)  {
    return (req, res, next) => {
      const {
        user: { userId },
      } = req;
      adminModel.findUser({ id: userId }).then((user) => {
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
  }
};


export default CheckPermission;