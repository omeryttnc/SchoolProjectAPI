import { Sequelize } from "sequelize";
import {secretdata} from"../secretdata.js" 

export const connection = new Sequelize(
  secretdata.mysql.database,
  secretdata.mysql.user,
  secretdata.mysql.password,
    {
      host: secretdata.mysql.host,
      dialect: secretdata.mysql.dialect,
  
      pool: {
         max: 5,
         min: 0,
         acquire: 30000,
         idle: 10000
      },
    }
  );

  export function executeQuery(query, params) {
    return new Promise((resolve, reject) => {
      connection.query(query, params, (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  }