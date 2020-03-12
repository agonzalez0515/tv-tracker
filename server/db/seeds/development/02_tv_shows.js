exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("tv_shows")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("tv_shows").insert([
        {
          name: "charmed",
          date_started: "2020-03-09",
          genre: "sci-fi",
          user_id: 1
        },
        {
          name: "one tree hill",
          date_started: "2020-01-01",
          date_finished: "2020-01-31",
          genre: "drama",
          user_id: 1
        },
        {
          name: "new girl",
          date_started: "2020-02-09",
          date_finished: "2020-03-09",
          genre: "comedy",
          user_id: 1
        }
      ]);
    });
};
