exports.seed = function(knex, Promise) {
  return knex('favorites').del()
    .then(function () {
      return Promise.all([
        knex('favorites').insert({id: '1', users_id:'1', coin_id:'RST', rank:'1'}),
        knex('favorites').insert({id: '2', users_id:'1', coin_id:'BTC', rank:'2'})
      ]);
    });
};