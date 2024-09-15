import { Sequelize } from "sequelize";
import secret from"../secretdata.json" assert {type:"json"};

export const connection = new Sequelize(
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