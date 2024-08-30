const { DataTypes } = require("sequelize");
const { roles } = require("../../config");

const TeacherModel = {
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
    defaultValue: roles.TEACHER
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false
  }
};

module.exports = {
  initialise: (sequelize) => {
    this.model = sequelize.define("teacher", TeacherModel);
   
  },
  createTeacher: (user) => {
    return this.model.create(user);
  },

  findTeacher: (query) => {
    return this.model.findOne({
      where: query,
    });
  },

  updateTeacher: (query, updatedValue) => {
    return this.model.update(updatedValue, {
      where: query,
    });
  },

  findAllTeachers: (query) => {
    return this.model.findAll({
      where: query
    });
  },

  deleteTeacher: (query) => {
    return this.model.destroy({
      where: query
    });
  }
};
