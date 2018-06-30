exports.seed = function(knex, Promise) {
  return knex('users').del()
    .then(function () {
      return Promise.all([
        knex('users').insert({id: '1', first_name:'a', last_name:'a', email:'a', password:'a', phone:'6472033511'})
      ]);
    });
};