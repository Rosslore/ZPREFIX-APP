const express = require('express');
const server = express();
const knex = require('knex')(require('../knexfile')["development"]);
// module.exports = app;

// Path: server/routes/inventory.js

////////READ////////
// get all inventory
server.get('/inventory', async (req, res) => {
    try {
        const inventory = await knex.from('inventory').select('*');
        res.status(200).json(inventory);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error retrieving inventory' });
    }
});

// get inventory by id

server.get('/inventory/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const inventory = await knex.from('inventory').select('*').where({ id: id });
        res.status(200).send(inventory);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error retrieving inventory' });
    }
});





////////CREATE////////
// create inventory

server.post('/inventory', async (req, res) => {
    try {
        const newInventory = await knex('inventory').insert({
            name: req.body.name,
            description: req.body.description,
            quantity: req.body.quantity,
        })
        const newInventoryResponse = `New inventory added successfully with id: ${newInventory} and name: ${req.body.name}`;
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error creating inventory' });
    }
});

////////UPDATE////////
// update inventory by id





