const express = require("express");
const mysql = require("mysql2");
const config = require("../config");
const app = express();
const secret = require("../secretdata.json");

const PORT = process.env.PORT || config.port;

const connection = mysql.createConnection(secret.mysql);

//routers
const UserRouters = require("../users/routers");

// module
const UserModule = require("../models/USER");

app.use(express.json());

app.listen(PORT, () => {
  console.log("server Listening on PORT", PORT);
  connection.connect((err) => {
    if (err) throw err;
    console.log("database connected");
  });
});

// initialise model
UserModule.initialise(connection);

app.use("/user", UserRouters);
