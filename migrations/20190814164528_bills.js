exports.up = function(knex) {
  return Promise.all([knex.schema.createTable('bills', (table) => {
      table.increments('id')
      table.string('number')
      table.string('title')
      table.string('url')
      table.string('committees')
      table.integer('senator_key')
    })
  ])
};

exports.down = function(knex) {
  return knex.dropTableIfExists('bills')
};
