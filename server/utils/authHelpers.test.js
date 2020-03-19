const supertest = require("supertest");
const jwt = require("jsonwebtoken");
const app = require("../setupServer");
const { withAuth } = require("./authHelpers");

app.use(withAuth);
app.get("/testRoute", function(req, res) {
  res.status(200).json("yay authorized!");
});

jest.mock("jsonwebtoken");
const request = supertest(app);

describe("withAuth middleware", () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });
  test("it returns a 401 response and an error message when there is no token", async () => {
    const res = await request.get("/testRoute");

    expect(res.status).toBe(401);
    expect(res.body).toBe("Unauthorized: No token provided");
  });

  test("it returns a 401 response and an error message if the token does not match", async () => {
    jwt.verify.mockImplementationOnce((a, b, callback) => {
      const err = true;
      callback(err);
    });

    const res = await request
      .get("/testRoute")
      .set("Cookie", "telly_tracker=12345667");

    expect(res.status).toBe(401);
    expect(res.body).toBe("Unauthorized: Invalid token");
  });

  test("it returns a 200 response and a success message if the token matches", async () => {
    jwt.verify.mockImplementationOnce((a, b, callback) => {
      const decoded = { email: "test", id: 1234 };
      callback(null, decoded);
    });

    const res = await request
      .get("/testRoute")
      .set("Cookie", "telly_tracker=12345667");

    expect(res.status).toBe(200);
    expect(res.body).toBe("yay authorized!");
  });
});
