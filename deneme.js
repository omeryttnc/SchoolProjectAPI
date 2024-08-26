const crypto = require("crypto");
const jwt = require("jsonwebtoken");


const { roles, jwtSecret, jwtExpirationInSeconds } = require("./config");

// Encrypts the password using SHA256 Algorithm, for enhanced security of the password
const encryptPassword = (password) => {
    // We will hash the password using SHA256 Algorithm before storing in the DB
    // Creating SHA-256 hash object
    const hash = crypto.createHash("sha256");
    // Update the hash object with the string to be encrypted
    hash.update(password);
    // Get the encrypted value in hexadecimal format
    return hash.digest("hex");
  };

  const generateAccessToken = (username, userId) => {
    return jwt.sign(
      {
        userId,
        username,
      },
      jwtSecret,
      {
        expiresIn: jwtExpirationInSeconds,
      }
    );
  };

  console.log("password : " + encryptPassword("asdWE32£$"));
  console.log("password : " + "asdWE32£$"==encryptPassword("asdWE32£$"));
  console.log("token : " + generateAccessToken("omer",2));
  console.log("token : " + generateAccessToken("omer",2));
  console.log("token : " + generateAccessToken("omer",2));
