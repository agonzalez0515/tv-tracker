exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("users")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("users").insert([
        {
          id: 1,
          email: "a@b.com",
          password_digest:
            "$2a$09$gFbNQvNK55kQa3Qn8nKwJeg3wfImFPUZZ9Cl89.OGKFIm0XiYbVbW"
        },
        {
          id: 2,
          email: "a@c.com",
          password_digest:
            "$2a$09$gFbNQvNK55kQa3Qn8nKwJeg3wfImFPUZZ9Cl89.OGKFIm0XiYbVbW"
        }
      ]);
    });
};
