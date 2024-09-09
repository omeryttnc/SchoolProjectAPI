const express = require("express");
const mysql = require("mysql2");
const config = require("../config");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const secret = require("../secretdata.json");
const cookieParser= require('cookie-parser')
const { Sequelize } = require("sequelize");

const PORT = process.env.PORT || config.port;

//routers
const AuthorizationRoutes = require("../authorization/routers");
const UserRouters = require("../users/routers");
const TeacherRouters = require("../teacher/routers")

// module
const UserModule = require("../common/models/User");
const TeacherModule= require("../common/models/TEACHER")

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());
app.use(cookieParser()); // cookie lere eklemek icin

// MySQL bağlantısını kur
const sequelize = new Sequelize(
  secret.mysql.database,
  secret.mysql.user,
  secret.mysql.password,
  {
    host: secret.mysql.host,
    dialect: secret.mysql.dialect,

    pool: {
       max: 5,
       min: 0,
       acquire: 30000,
       idle: 10000
    },
  }
);

// initialise model
UserModule.initialise(sequelize);
TeacherModule.initialise(sequelize)

sequelize
  .sync()
  .then(() => {
    console.log("Sequelize Initialised!!");

    app.use("/api/user", UserRouters);
    app.use("/api/", AuthorizationRoutes);
    app.use("/api/teacher",TeacherRouters);

    app.listen(PORT, () => {
      console.log("server Listening on PORT", PORT);
    });
  })
  .catch((err) => {
    console.error("Sequelize Initialisation threw an error:", err);
  });
