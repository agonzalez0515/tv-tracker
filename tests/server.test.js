const supertest = require("supertest");
const app = require("../server");

test("GET /", done => {
  supertest(app)
    .get("/status")
    .expect(200, JSON.stringify({ status: "I'm alive!" }))
    .end(done);
});
