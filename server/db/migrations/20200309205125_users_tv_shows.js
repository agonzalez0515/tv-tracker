exports.up = function(knex) {
  return Promise.all([
    knex.schema.createTable("users", table => {
      table.increments("id").primary();
      table.string("email");
      table.string("password_digest");
    }),
    knex.schema.createTable("tv_shows", table => {
      table.increments("id").primary();
      table.string("name");
      table.date("date_started").defaultTo(knex.fn.now());
      table.date("date_finished");
      table.string("genre");
      table.integer("time_watching").defaultTo(0);
      table
        .integer("user_id")
        .references("id")
        .inTable("users");
    })
  ]);
};
exports.down = function(knex) {
  return Promise.all([
    knex.schema.dropTable("users"),
    knex.schema.dropTable("tv_shows")
  ]);
};
