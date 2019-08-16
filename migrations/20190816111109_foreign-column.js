
exports.up = function(knex) {
  return knex.schema.table('bills', function(table) {
    table.dropColumn('senator_key');

  })
};

exports.down = function(knex) {
  table.integer('senator_key')
};
