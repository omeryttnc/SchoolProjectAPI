module.exports = {
    port: 3000,
    baseUrl:'http://127.0.0.1:3000',
    jwtSecret: '!!CryptoCat@!!',
    jwtExpirationInSeconds: 60 * 60, // 1 hour
    roles: {
      USER: 'user',
      ADMIN: 'admin',
      STUDENT: 'student',
      TEACHER: 'teacher',
      MUDUR: 'mudur'
    },
    productPriceUnits: {
      DOLLAR: 'dollar',
      EURO: 'euro',
      INR: 'inr'
    }
  }