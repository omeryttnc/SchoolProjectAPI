describe("register", () => {
  const supertest = require("supertest");
  const { app } = require("../src/index.js");
  describe("post signup route", () => {
    describe("given positive scenario", () => {
      it("should return 200", async () => {
        const user = {
          username: "omer",
          email: "omer@gmail.com",
          password: "asdWE32£$",
          firstName: "omer",
          lastName: "ali",
          role: "admin",
        };

        await supertest(app).post("/signup").expect(200);
      });
    });
  });
});
