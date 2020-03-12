exports.up = function(knex) {
  return Promise.all([
    knex.schema.table("tv_shows", table => {
      table.time("time_spent");
    })
  ]);
};

exports.down = function(knex) {
  return Promise.all([knex.schema.dropTable("tv_shows")]);
};
