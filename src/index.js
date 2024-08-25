const express = require("express");
const mysql = require("mysql2");
const config = require("../config");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const secret = require("../secretdata.json");
const { Sequelize } = require("sequelize");

const PORT = process.env.PORT || config.port;

//routers
const AuthorizationRoutes = require("../authorization/routers");
const UserRouters = require("../users/routers");

// module
const UserModule = require("../common/models/User");

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());

// MySQL bağlantısını kur
const sequelize = new Sequelize(
  secret.mysql.database,
  secret.mysql.user,
  secret.mysql.password,
  {
    host: secret.mysql.host,
    dialect: secret.mysql.dialect,
  }
);

// initialise model
UserModule.initialise(sequelize);

sequelize
  .sync()
  .then(() => {
    console.log("Sequelize Initialised!!");

    app.use("/user", UserRouters);
    app.use("/", AuthorizationRoutes);

    app.listen(PORT, () => {
      console.log("server Listening on PORT", PORT);
    });
  })
  .catch((err) => {
    console.error("Sequelize Initialisation threw an error:", err);
  });
