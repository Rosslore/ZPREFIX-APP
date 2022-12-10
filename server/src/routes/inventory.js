const express = require('express');
const router = express.Router();
const inventoryController = require('../controllers/inventoryController');

///GET ALL INVENTORY///
router.route('/').get(inventoryController.getAll)
                .post(inventoryController.create);
router
    .route('/:id')
    .get(inventoryController.getById)
    .put(inventoryController.update)
    .delete(inventoryController.delete);

module.exports = router;

// imported express, created router, and imported inventoryController from inventoryController.js
// created routes for get all inventory, get inventory by id, create inventory, update inventory, and delete inventory
// exported router

