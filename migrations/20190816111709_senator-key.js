
exports.up = function(knex) {
  return knex.schema.table('bills', function(table) {
    table.integer('senator_key').unsigned()
    table.foreign('senator_key')
        .references('senator.id');
  })
};

exports.down = function(knex) {
  table.dropColumn('senator_key')
};
