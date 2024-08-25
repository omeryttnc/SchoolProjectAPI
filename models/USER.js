const UserModel =
  " CREATE TABLE if not exists " +
  " `schoolproject`.`user` " +
  " (`iduser` INT NOT NULL AUTO_INCREMENT," +
  " `email` VARCHAR(45) NULL, " +
  " `password` VARCHAR(45) NULL ," +
  "  PRIMARY KEY (`iduser`));";
let database;
module.exports = {
  initialise: (connection) => {
    database = connection;
    return database.query(
      UserModel
    );
  },
  createUser: (user) => {
    return database.query(
      `insert into user (email,password) values ( "${user.email}" , "${user.password}")`,
      (err, result) => {
        if (err) throw err;
        return result;
      }
    );
  },

  findUser: (iduser) => {
    return database
      .promise()
      .query(`select * from user where iduser = ${iduser}`)
      .then((result) => {
        return result[0];
      })
      .catch((err) => {
        if (err) throw err;
      });
  },

  findAllUser: () => {
    return database
      .promise()
      .query("select * from `schoolproject`.`user`")
      .then((result) => {
        return result[0];
      })
      .catch((err) => {
        if (err) throw err;
      });
  },

  deleteUser: (iduser) => {
    database.query(`delete from user where iduser = ${iduser}`);
  },
};
