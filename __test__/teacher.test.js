import jwt from "jsonwebtoken";
import TEACHER from "../common/models/TEACHER.js";
import mysql from "mysql2";
import supertest from "supertest";
import { createServer } from "../src/server.js";
import { getAllTeachers, singleTeacher } from "../__data__/teacherMock.js";

describe("teacher", () => {
  describe("get teacher route", () => {
    describe("given get all teacher", () => {
      it("should find all call one time ", async () => {
        TEACHER.findAll = jest.fn().mockResolvedValue(getAllTeachers);

        // Act: Call the service that uses User.findAll()
        const result = await TEACHER.findAll();

        // Assert: Ensure the result matches the mock data
        expect(result).toEqual(getAllTeachers);
        expect(TEACHER.findAll).toHaveBeenCalled();
        expect(TEACHER.findAll).toHaveBeenCalledTimes(1);
      });
    });

    describe("given get single teacher", () => {
      //TODO positive test needs here
      it("shhould find One call one time", async () => {
        TEACHER.findOne = jest.fn().mockResolvedValue(singleTeacher);
        const teacherId = 3;
        const result = await TEACHER.findOne(teacherId);

        expect(result).toEqual(singleTeacher);
        expect(TEACHER.findOne).toHaveBeenCalled();
        expect(TEACHER.findOne).toHaveBeenCalledTimes(1);
      });

      it("should mock MySQL query", async () => {
        const mockConnection = mysql.createConnection();

        // Mock query method
        mockConnection.query.mockImplementation((_query, _params, callback) => {
          callback(null, getAllTeachers); // Simulate a successful result
        });

        // Execute your query
        const result = await new Promise((resolve, reject) => {
          mockConnection.query(
            "SELECT * FROM teachers WHERE id = ?",
            [1],
            (err, results) => {
              if (err) reject(err);
              resolve(results);
            }
          );
        });

        // Assert that the result is what you expect
        expect(result).toEqual(getAllTeachers);
      });

      it("should get 401 without authontication", async () => {
        const mockConnection = mysql.createConnection();
        const validToken = "fake token";

        mockConnection.query.mockImplementation((_query, _params, callback) => {
          callback(null, getAllTeachers); // Simulate a successful result
        });

        // Execute your query
        const result = await new Promise((resolve, reject) => {
          mockConnection.query(
            "SELECT * FROM teachers WHERE id = ?",
            [1],
            (err, results) => {
              if (err) reject(err);
              resolve(results);
            }
          );
        });

        await supertest(createServer())
          .get("/api/teacher/all")
          .set("Authorization", `Bearer ${validToken}`) // Geçerli bir token ekleniyor
          .expect(403)
          .then((res) => {
            expect(res.body.status).toBeFalsy();
            expect(res.body.error).toEqual(
              "Invalid access token provided, please login again."
            );
          });

        // Assert that the result is what you expect
        expect(result).toEqual(getAllTeachers);
      });

      it.only("should get 401 without authontication 2", async () => {
        const mockConnection = mysql.createConnection();
        const validToken = jwt.sign(
          { userId: 1, username: "Hildegard" },
          "testSecret",
          {
            expiresIn: "1m", // Token geçerlilik süresi
          }
        );

        jest.resetAllMocks(); // Ensure mocks are reset for this test

        // jest.mock("../common/middlewares/IsAuthenticatedMiddleware.js", () =>
        //   jest.fn((_req, _res, next) => next())
        // ); // JWT middleware bypass

        jest.mock("../common/models/TEACHER.js", () => ({
          findAll: jest.fn(),
          findOne: jest.fn(),
        }));

        jest.mock("jsonwebtoken", () => ({
          sign: jest.fn(() => "mockedToken"),
          verify: jest.fn((token, secret, callback) => {
            callback(null, { userId: 1, username: "Hildegard" }); // Doğrulanmış token
          }),
        }));
        mockConnection.query = jest
          .fn()
          .mockImplementation((_query, _params, callback) => {
            callback(null, getAllTeachers); // Simulate a successful result
          });

        TEACHER.findAll = jest.fn().mockResolvedValue(getAllTeachers);

        await supertest(createServer())
        // .body(
          
        // )
          .post("/login")
        // .set("authorization", `Bearer ${validToken}`) // Geçerli bir token ekleniyor
          //.expect(200)
          .then((res) => {
            // console.log("res.body.error.message " + res.body.error.message);
            console.log("res.body.status " + res.body.status);
            console.log("res.status " + res.status);
            console.log("res " + res);
          });
      });
    });
  });
});
