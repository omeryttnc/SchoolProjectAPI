module.exports = {
  port: 3000,
  baseUrl: "http://127.0.0.1:3000",
  jwtSecret: "!!ZfFe3##/Sif0re@!!123",
  jwtExpirationInSeconds: 60 * 60, // 1 hour
  roles: {
    ADMIN: "admin",
    STUDENT: "student",
    TEACHER: "teacher",
  },
};
