// Update with your config settings.

module.exports = {
  development: {
    client: "pg",
    connection: {
      host: "db",
      database: "postgres",
      user: "postgres",
      password: "mysecretpassword",
      port: 5432
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: __dirname + "/db/migrations"
    },
    seeds: {
      directory: __dirname + "/db/seeds/development"
    }
  }
};
