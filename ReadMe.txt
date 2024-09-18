create secretdata.js file and add your mysql database info as follow


export const secretdata={
  "mysql": {
    "host": "localhost",
    "database": "schoolproject",
    "user": "root",
    "password": "root",
    "dialect": "mysql"
  }
}

then run ('npm install') command