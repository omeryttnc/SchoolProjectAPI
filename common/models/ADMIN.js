const { DataTypes, QueryTypes } = require("sequelize");
const { roles } = require("../../config");

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
  approved: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
    defaultValue: false,
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

  approveUser: (query, updatedValue) => {
    if (updatedValue.role == roles.TEACHER) {
      return this.model.sequelize.query(
        `update teachers set approved = 1 where id = ${query.id} `
      );
    }
     else if (updatedValue.role == roles.STUDENT) {
      return this.model.sequelize
        .query(
          `update students set approved = 1 where id = ${query.id} `
        )
        
    }else{
      return this.model.sequelize
        .query()
    }
  },

  deactivateUser: (query, updatedValue) => {
    if (updatedValue.role == roles.TEACHER) {
      return this.model.sequelize.query(
        `update teachers set approved = 0 where id = ${query.id} `
      );
    }
     else if (updatedValue.role == roles.STUDENT) {
      return this.model.sequelize
        .query(
          `update students set approved = 0 where id = ${query.id} `
        )
    }
  },

/*
else if (updatedValue.role == roles.ADMIN) {
      return this.model.sequelize
        .query(
          `update admins set approved = 1 where id = ${query.id} `
        )   
    }

    else if (updatedValue.role == roles.ADMIN) {
      return this.model.sequelize
        .query(
          `update admins set approved = 0 where id = ${query.id} `
        )   
    }



*/
};
