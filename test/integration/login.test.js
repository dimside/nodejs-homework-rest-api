const mongoose = require("mongoose");
require("dotenv").config();
const app = require("../../app");
const supertest = require("supertest");

const { DB_HOST } = process.env;
console.log("DB_HOST", DB_HOST);

describe("login", () => {
  beforeAll(async () => {
    await mongoose.connect(DB_HOST);
  });
  afterAll(async () => {
    await mongoose.disconnect(DB_HOST);
  });

  test("response status code 200", async () => {
    const response = await supertest(app).get("/api/auth/users/login/").send({
      email: "testUser1@mail.com",
      password: "123456",
    });

    expect(response.statusCode).toBe(200);
  });

  test("should return token", async () => {
    const response = await supertest(app).get("/api/auth/users/login/").send({
      email: "testUser1@mail.com",
      password: "123456",
    });

    expect(response.body.token).toBeTruthy();
  });

  test("should return object with two fields email and subscription, type: string", async () => {
    const response = await supertest(app).get("/api/auth/users/login/").send({
      email: "testUser1@mail.com",
      password: "123456",
    });
    const user = {
      email: expect.any(String),
      subscription: expect.any(String),
    };
    expect(response.body.user).toMatchObject(user);
  });
});
