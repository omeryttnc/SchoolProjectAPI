import TEACHER from "../common/models/TEACHER.js";
import mysql from "mysql2";
import supertest from "supertest";
import { app } from "../src/index.js";

jest.mock("../common/models/TEACHER.js");

describe("register", () => {
  describe("post signup route", () => {
    describe("given positive scenario", () => {
      const mockResult = {
        status: true,
        data: [
          {
            id: 1,
            username: "Hildegard",
            email: "Allie12@yahoo.com",
            password:
              "10012a951f7bff108d610ea61d1085612da3efe50fbbabb840dc3515f90fd66a",
            role: "teacher",
            firstName: "omer",
            lastName: "ali",
            approved: false,
            createdAt: "2024-09-11T22:14:55.000Z",
            updatedAt: "2024-09-11T22:14:55.000Z",
          },
          {
            id: 2,
            username: "Hildegard",
            email: "Allie12@yahoo.com",
            password:
              "10012a951f7bff108d610ea61d1085612da3efe50fbbabb840dc3515f90fd66a",
            role: "teacher",
            firstName: "omer",
            lastName: "ali",
            approved: false,
            createdAt: "2024-09-11T22:14:55.000Z",
            updatedAt: "2024-09-11T22:14:55.000Z",
          },
        ],
      };
      it("should return 200", async () => {
      
       

        TEACHER.findAll= jest.fn().mockResolvedValue(mockResult);

        // Act: Call the service that uses User.findAll()
        const result = await TEACHER.findAll();

        // Assert: Ensure the result matches the mock data
        expect(result).toEqual(mockResult);
        expect(TEACHER.findAll).toHaveBeenCalled();
        expect(TEACHER.findAll).toHaveBeenCalledTimes(1);
        
      });
    });


  });
});
