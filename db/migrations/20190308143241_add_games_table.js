
exports.up = function(knex, Promise) {
    return knex.schema.createTable('games', tbl => {
        tbl.increments();

        tbl
            .string('title')
            .notNullable()
            .unique('uq_game_title');

        tbl
            .string('genre')
            .notNullable();

        tbl
            .integer('releaseYear');

        tbl
            .timestamp('createdAt')
            .defaultTo(knex.fn.now());
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('games');
};
