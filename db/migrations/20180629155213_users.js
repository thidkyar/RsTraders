exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema
    .createTable('users', function(table) {
      table.increments('id').primary();
      table.string('first_name');
      table.string('last_name');
      table.string('email').notNullable();
      table.string('password').notNullable();
      table.string('phone');
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema
    .dropTable('users')
  ])
};