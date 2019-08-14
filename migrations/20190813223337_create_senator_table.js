
exports.up = function(knex) {
  return promise.all([knex.schema.createTable('senator', (table) => {
      table.increments('id')
      table.varchar('first_name')
      table.varchar('last_name')
      table.integer('total_votes')
      table.varchar('contact')
      table.varchar('state')
      table.varchar('party')
    })
  ])
};

exports.down = function(knex) {
  return knex.dropTableIfExists('senator')
};
