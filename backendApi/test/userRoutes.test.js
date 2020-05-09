const User = require("../models/user");
const request = require("supertest");
const expect = require("chai").expect;
import "babel-polyfill";
const app = require("../server.js");
const host = "http://localhost:8080";
describe("api/users", () => {
  beforeEach(async () => {
    await User.deleteOne({ email: "test508@gmail.com" });
  });

  describe("/signup ", () => {
    const user = { email: "test508@gmail.com", password: "test" };

    it("should register the user passed", async () => {
      const res = await request(host).post("/user/signup").send({ user: user });
      expect(res.status).to.equal(201);
      expect(res.body.user).to.not.be.undefined;
      expect(res.body.user).to.not.be.null;
    });
    it("should register a user passed +return an object  with token + email", async () => {
      const res = await request(host).post("/user/signup").send({ user: user });
      expect(res.status).to.equal(201);
      expect(res.body.user).to.have.property("email", user.email);
      expect(res.body.user).to.have.property("token");
    });

    it("should NOT register an existing user email", async () => {
      const errors = { global: "Email already exists" };
      const newUser = new User({ email: user.email, isConfirmed: false });
      newUser.setPassword(user.password);
      newUser.setConfirmationToken();
      const createdUser = await newUser.save();
      console.log(createdUser);
      const res = await request(host).post("/user/signup").send({ user: user });
      expect(res.status).to.equal(400);
      expect(res.body.errors.global).to.equal(errors.global);
    });

    it("should register a user passed + return user not confirmed", async () => {
      const res = await request(host).post("/user/signup").send({ user: user });
      expect(res.status).to.equal(201);
      expect(res.body.user).to.have.property("isConfirmed", false);
    });
  });

  //   describe("GET/:id", () => {
  //     it("should return a user if valid id is passed", async () => {
  //       const user = new User({
  //         name: "test",
  //         email: "test@gmail.com",
  //         gender: "male",
  //       });
  //       await user.save();
  //       const res = await request(app).get("/api/users/" + user._id);
  //       expect(res.status).to.equal(200);
  //       expect(res.body).to.have.property("name", user.name);
  //     });

  //     it("should return 400 error when invalid object id is passed", async () => {
  //       const res = await request(app).get("/api/users/1");
  //       expect(res.status).to.equal(400);
  //     });

  //     it("should return 404 error when valid object id is passed but does not exist", async () => {
  //       const res = await request(app).get("/api/users/111111111111");
  //       expect(res.status).to.equal(404);
  //     });
  //   });

  //   describe("POST /", () => {
  //     it("should return user when the all request body is valid", async () => {
  //       const res = await request(app).post("/api/users").send({
  //         name: "test",
  //         email: "test@gmail.com",
  //         gender: "male",
  //       });
  //       expect(res.status).to.equal(200);
  //       expect(res.body).to.have.property("_id");
  //       expect(res.body).to.have.property("name", "test");
  //     });

  //     // add more tests to validate request body accordingly eg, make sure name is more than 3 characters etc
  //   });

  //   describe("PUT /:id", () => {
  //     it("should update the existing order and return 200", async () => {
  //       const user = new User({
  //         name: "test",
  //         email: "test@gmail.com",
  //         gender: "male",
  //       });
  //       await user.save();

  //       const res = await request(app)
  //         .put("/api/users/" + user._id)
  //         .send({
  //           name: "newTest",
  //           email: "newemail@gmail.com",
  //           gender: "male",
  //         });

  //       expect(res.status).to.equal(200);
  //       expect(res.body).to.have.property("name", "newTest");
  //     });
  //   });

  //   describe("DELETE /:id", () => {
  //     it("should delete requested id and return response 200", async () => {
  //       const user = new User({
  //         name: "test",
  //         email: "test@gmail.com",
  //         gender: "male",
  //       });
  //       await user.save();

  //       const res = await request(app).delete("/api/users/" + user._id);
  //       expect(res.status).to.be.equal(200);
  //     });

  //     it("should return 404 when deleted user is requested", async () => {
  //       const user = new User({
  //         name: "test",
  //         email: "test@gmail.com",
  //         gender: "male",
  //       });
  //       await user.save();

  //       let res = await request(app).delete("/api/users/" + user._id);
  //       expect(res.status).to.be.equal(200);

  //       res = await request(app).get("/api/users/" + user._id);
  //       expect(res.status).to.be.equal(404);
  //     });
  //   });
});
