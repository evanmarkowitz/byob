
exports.up = function(knex) {
  return Promise.all([
    knex.schema.table('senator', function(table) {
      table.string('bills');
    })
  ]);
};

exports.down = function(knex) {
  knex.schema.table('senator', function(table) {
    table.dropColumn('bills');
  })
};
