const graphqlHTTP = require("express-graphql");
const { withAuth } = require("./utils/withAuth");
const users = require("./routes/users");
const schema = require("./schema");
const app = require("./setupServer");

// resources api
app.use(
  "/api",
  graphqlHTTP({
    schema: schema,
    graphiql: true
  })
);

// auth routes
app.use("/users", users);
app.get("/checkToken", withAuth, function(req, res) {
  res.status(200).json({ email: req.email });
});
app.get("/logout", function(req, res) {
  res.clearCookie("telly_tracker").sendStatus(200);
});

module.exports = app;
