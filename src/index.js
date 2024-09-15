import express from "express";
import {config} from"../config.js";
export const app = express();
import cors from"cors";
import morgan from"morgan";
import cookieParser from 'cookie-parser'
import {connection} from "./connection.js"

const PORT = process.env.PORT || config.port;

//routers
import AuthorizationRoutes from"../authorization/routers.js";
import AdminRouters from "../admin/routers.js";
import TeacherRouters from "../teacher/routers.js"
import StudentRouters from "../student/routers.js"

// module
import AdminModule from "../common/models/ADMIN.js";
import TeacherModule from "../common/models/TEACHER.js"
import StudentModule from "../common/models/STUDENT.js"

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());
app.use(cookieParser()); // cookie lere eklemek icin

// MySQL bağlantısını kur
const sequelize = connection

// initialise model
new AdminModule(sequelize);
new TeacherModule(sequelize)
new StudentModule(sequelize)

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
