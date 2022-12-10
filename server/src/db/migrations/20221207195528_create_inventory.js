/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('inventory', (table) => {
        table.increments('id').primary();
        table.string('name');
        table.string('description');
        table.string('quantity');
        table.integer('user_id').references('id').inTable('users')
            .onDelete('CASCADE') // delete inventory if user is deleted
            .onUpdate('CASCADE'); // update inventory if user is updated
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.alterTable('inventory', (table) => {
        table.dropForeign('user_id');
    }).dropTableIfExists('inventory');
};


//created relation between inventory and users tables by adding user_id column to inventory table and referencing the id column in the users table.