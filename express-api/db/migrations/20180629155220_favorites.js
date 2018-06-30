exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema
    .createTable('favorites', function(table) {
      table.increments('id').primary();
      table.integer('users_id').references('id').inTable('users');
      table.string('coin_id');
      table.integer('rank');
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema
    .dropTable('favorites')
  ])
};
