const express = require("express");
const graphqlHTTP = require("express-graphql");
const path = require("path");
const { withAuth } = require("./utils/authHelpers");
const schema = require("./api/schema");
const app = require("./setupServer");
const users = require("./routes/users");

// auth routes
app.use("/users", users);
app.get("/checkToken", withAuth, function(req, res) {
  res.status(200).json({ email: req.user.email });
});
app.get("/logout", function(req, res) {
  res.clearCookie("telly_tracker").sendStatus(200);
});

app.get("/status", function(req, res) {
  res.status(200).json({ status: "I'm alive!" });
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));
  app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "../client/build", "index.html"));
  });
}

app.use(withAuth);

// resources api
app.use(
  "/api",
  graphqlHTTP({
    schema: schema,
    graphiql: true
  })
);

module.exports = app;
