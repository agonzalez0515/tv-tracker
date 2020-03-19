const supertest = require("supertest");
const app = require("../setupServer");
const users = require("../routes/users");
const knex = require("../db/knex");

app.use(users);
const request = supertest(app);

describe("user endpoints", () => {
  async function unlock() {
    await knex.schema.hasTable("knex_migrations_lock").then(async exists => {
      if (exists) {
        await knex("knex_migrations_lock").update("is_locked", "0");
      }
    });
  }

  beforeEach(function(done) {
    unlock();
    knex.migrate.rollback().then(function() {
      knex.migrate.latest().then(function() {
        return knex.seed.run().then(function() {
          done();
        });
      });
    });
  });

  afterEach(function(done) {
    unlock();
    knex.migrate.rollback().then(function() {
      done();
    });
  });

  // afterAll(async () => {
  //   await new Promise(resolve => setTimeout(() => resolve(), 500)); // avoid jest open handle error
  // });

  describe("/register", () => {
    test("it returns 200 status code and email when a user is created", async () => {
      const res = await request
        .post("/register")
        .send({
          email: "angie@test.com",
          password: "testing"
        })
        .set("Accept", "application/json");

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("email");
    });

    test("returns 400 and error message if email already exists", async () => {
      const res = await request
        .post("/register")
        .send({
          email: "a@b.com",
          password: "testing"
        })
        .set("Accept", "application/json");

      expect(res.status).toBe(400);
      expect(res.body).toBe("Email already taken");
    });
  });

  describe("/login", () => {
    test("it returns 200 status code and email when a user is authenticated", async () => {
      const res = await request
        .post("/login")
        .send({
          email: "a@b.com",
          password: "test"
        })
        .set("Accept", "application/json");

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("email");
    });

    test("it returns a cookie when a user is authenticated", async () => {
      const res = await request
        .post("/login")
        .send({
          email: "a@b.com",
          password: "test"
        })
        .set("Accept", "application/json");

      const cookieHeader = res.headers["set-cookie"];

      expect(cookieHeader[0]).toEqual(expect.stringContaining("telly_tracker"));
    });

    test("it returns a 400 status code and an error message when a user enters an email not found", async () => {
      const res = await request
        .post("/login")
        .send({
          email: "hey@ok.com",
          password: "test"
        })
        .set("Accept", "application/json");

      expect(res.status).toBe(400);
      expect(res.body).toBe("Email/password combination not found");
    });

    test("it returns a 400 status code and an error message when a user enters an incorrect password", async () => {
      const res = await request
        .post("/login")
        .send({
          email: "a@c.com",
          password: "wrongpassword"
        })
        .set("Accept", "application/json");

      expect(res.status).toBe(400);
      expect(res.body).toBe("Email/password combination not found");
    });
  });
});
