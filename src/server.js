import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";

//routers
import AuthorizationRoutes from "../authorization/routers.js";
import AdminRouters from "../admin/routers.js";
import TeacherRouters from "../teacher/routers.js";
import StudentRouters from "../student/routers.js";

export const createServer = () => {
  const app = express();

  
  app.use(morgan("tiny"));
  app.use(cors());
  app.use(express.json());
  app.use(cookieParser()); // cookie lere eklemek icin

  app.use("/api/user", AdminRouters);
  app.use("/api", AuthorizationRoutes);
  app.use("/api/teacher", TeacherRouters);
  app.use("/api/student", StudentRouters);

  return app;
};
