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
const AdminRouters = require("../admin/routers");
const TeacherRouters = require("../teacher/routers")
const StudentRouters = require("../student/routers")

// module
const AdminModel = require("../common/models/ADMIN");
const TeacherModule= require("../common/models/TEACHER")
const StudentModule= require("../common/models/STUDENT")

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
AdminModel.initialise(sequelize);
TeacherModule.initialise(sequelize)
StudentModule.initialise(sequelize)

sequelize
  .sync()
  .then(() => {
    console.log("Sequelize Initialised!!");

    app.use("/api/user", AdminRouters);
    app.use("/api", AuthorizationRoutes);
    app.use("/api/teacher",TeacherRouters);
    app.use("/api/student",StudentRouters);

    app.listen(PORT, () => {
      console.log("server Listening on PORT", PORT);
    });
  })
  .catch((err) => {
    console.error("Sequelize Initialisation threw an error:", err);
  });
