const express = require("express");
const mysql = require("mysql2");
//import port from '../config'
const app = express();

const PORT = process.env.PORT || "3000";

const connection = mysql.createConnection({
  host: "localhost",
  database: "schoolproject",
  user: "root",
  password: "root",
});

//routers
const UserRouters = require("../users/routers");

// module
const UserModule = require("../models/USER");

app.use(express.json());

app.listen(PORT,  () => {
  console.log("server Listening on PORT", PORT);
   connection.connect((err) => {
    if (err) throw err;
    console.log("database connected");
  });
});

// initialise model
UserModule.initialise(connection);

// app.use("/all", (req, res) => {
//   const sql_query = "select * from user";
//   connection.query(sql_query, (err, result) => {
//     if (err) throw err;
//     res.send(result);
//   });
// });

app.use("/user", UserRouters);
