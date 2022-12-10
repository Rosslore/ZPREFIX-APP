const db = require('../config/db');

module.exports = inventoryService = {
    getAll: async () => {
        const inventory = await db('inventory')
            // .join('users', 'users.id', 'inventory.user_id')
            // .select(
            //     'inventory.*',
            //     'users.first_name',
            //     'users.last_name',
            // );
        return inventory;
    },
    getById: async (id) => {
        const inventory = await db('inventory').where({ id: id }).first();
        return inventory;
    },
    create: async (inventory) => {
        const newInventory = await db('inventory').insert(inventory);
        return newInventory;
    },
    update: async (id, inventory) => {
        const updatedInventory = await db('inventory').where({ id: id }).update({
            name: inventory.name,
            description: inventory.description,
            quantity: inventory.quantity
        });
        return updatedInventory;
    },
    delete: async (id) => {
        const deletedInventory = await db('inventory').where({ id: id }).del();
        return deletedInventory;
    },
}

// imported knex from db.js then created inventoryService object with methods to get all inventory, get inventory by id, create inventory, update inventory, and delete inventory from the database.
