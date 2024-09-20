import { config } from "../config.js";
import { createServer } from "./server.js";
import { connection } from "./connection.js";

const PORT = process.env.PORT || config.port;

// module
import AdminModule from "../common/models/ADMIN.js";
import TeacherModule from "../common/models/TEACHER.js";
import StudentModule from "../common/models/STUDENT.js";

const app = createServer();



// MySQL bağlantısını kur
const sequelize = connection;

// initialise model
new AdminModule(sequelize);
new TeacherModule(sequelize);
new StudentModule(sequelize);

sequelize
  .sync()
  .then(() => {
    console.log("Sequelize Initialised!!");
    // if (!app.listen) {
      // if it is not listening we will create server

      app.listen(PORT, () => {
        console.log("server Listening on PORT", PORT);
      });
    // }
  })
  .catch((err) => {
    console.error("Sequelize Initialisation threw an error:", err);
  });
