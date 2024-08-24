const UserModel =
  "CREATE TABLE if not exists `schoolproject`.`user` (`iduser` INT NOT NULL AUTO_INCREMENT,`email` VARCHAR(45) NULL,  `password` VARCHAR(45) NULL ,  PRIMARY KEY (`iduser`));";
let database;
module.exports = {
  initialise: (connection) => {
    database = connection;
    connection.query(UserModel, (err, result) => {
      if (err) throw err;
    });
  },
  createUser: (user) => {
    database.execute(
      `insert into user (email,password) values ( "${user.email}" , "${user.password}")`,
      (err, result) => {
        if (err) throw err;
        return result;
      }
    );
  },
  findAllUser: () => {
    return database.execute(`select * from user`, (err, result) => {
      if (err) throw err;
      return result;
    });
  },
};
