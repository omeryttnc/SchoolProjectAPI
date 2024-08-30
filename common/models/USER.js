const { DataTypes } = require("sequelize");
const { roles } = require("../../config");
const { sql } = require("@sequelize/core");

const UserModel = {
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
    defaultValue: roles.USER,
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
};

module.exports = {
  initialise: (sequelize) => {
    this.model = sequelize.define("admin", UserModel);
  },
  createUser: (user) => {
    return this.model.create(user);
  },

  findUser: (query) => {
    return this.model.findOne({
      where: query,
    });
  },

  updateUser: (query, updatedValue) => {
    return this.model.update(updatedValue, {
      where: query,
    });
  },

  findAllUsers: (query) => {
    return this.model.findAll({
      where: query,
    });
  },

  deleteUser: (query) => {
    return this.model.destroy({
      where: query,
    });
  },

  moveUser: async (query, updatedValue) => {
  
    if (updatedValue.role == roles.TEACHER) {
      const result= this.model.sequelize.query(
        `insert into teachers (username,email,password,role,firstName,lastName,createdAt,updatedAt) select username,email,password,role,firstName,lastName,createdAt,updatedAt from admins where id = ${query.id}`
      )
      console.log("result : " + await result);
      // .then(()=>{
      //   this.model.sequelize.close()
      // });
      return await  this.model.sequelize.query(
        `insert into teachers (username,email,password,role,firstName,lastName,createdAt,updatedAt) select username,email,password,role,firstName,lastName,createdAt,updatedAt from admins where id = ${query.id}`
      )
    }
    //  else if (updatedValue.role == roles.STUDENT) {
    //   return this.model.sequelize.query(
    //     `insert into students (username,email,password,role,firstName,lastName,createdAt,updatedAt) select username,email,password,role,firstName,lastName,createdAt,updatedAt from admins where id = ${query.id}`
    //   ).finally(()=>{

    //     this.model.sequelize.close()
    //   });
    // }
  },
  
  closeSequelize:()=>{

  }
};
