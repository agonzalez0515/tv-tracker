const supertest = require("supertest");
const app = require("./server");
const request = supertest(app);
const withAuth = require("./utils/authHelpers");

jest.mock("./utils/authHelpers");

//TODO finish tests :(

xdescribe("server", () => {
  test("checkToken endpoint", async () => {
    withAuth.mockImplementationOnce((req, res, next) => {
      return next();
    });

    const res = await request
      .get("/checkToken")
      .expect(200, JSON.stringify({ status: "I'm alive!" }))
      .end(done);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("email");
  });
});
