const { DataTypes } = require("sequelize");
const { roles } = require("../../config");

const STUDENTModel = {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: roles.STUDENT
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  approved: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
    defaultValue: false,
  },
};

module.exports = {
  initialise: (sequelize) => {
    this.model = sequelize.define("student", STUDENTModel);
   
  },
  createStudent: (user) => {
    return this.model.create(user);
  },

  findStudent: (query) => {
    return this.model.findOne({
      where: query,
    });
  },

  updateStudent: (query, updatedValue) => {
    return this.model.update(updatedValue, {
      where: query,
    });
  },

  findAllStudents: (query) => {
    console.log("all students called");
    return this.model.findAll({
      where: query
    });
  },

  deleteStudent: (query) => {
    return this.model.destroy({
      where: query
    });
  }
};
