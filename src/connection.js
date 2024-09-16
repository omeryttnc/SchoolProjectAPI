import { Sequelize } from "sequelize";
import secret from"../secretdata.json" with {type:"json"}; // TODO with not working in DEV to work change with to assert

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