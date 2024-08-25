const express = require("express");
const mysql = require("mysql2");
const config = require("../config");
const app = express();
const secret = require("../secretdata.json");
const { Sequelize } = require("sequelize");

const PORT = process.env.PORT || config.port;

const connection = mysql.createConnection(secret.mysql);

//routers
const UserRouters = require("../users/routers");

// module
const UserModule = require("../common/models/USER");

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

sequelize.sync().then(() => {
  console.log("Sequelize Initialised!!");

  app.use("/user", UserRouters);


  app.listen(PORT, () => {
    console.log("server Listening on PORT", PORT);
    // connection.connect((err) => {
    //   if (err) throw err;
    //   console.log("database connected");
    // });
  });
})
.catch((err)=>{
  console.error("Sequelize Initialisation threw an error:", err);

})
