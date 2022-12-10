const inventoryService = require('../service/inventoryService');


module.exports = inventoryController = {
    getAll: async (req, res) => {
        try {
            const inventory = await inventoryService.getAll();
            res.status(200).json(inventory);
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Error retrieving inventory' });
        }
    },
    getById: async (req, res) => {
        const id = req.params.id;
        try {
            const inventory = await inventoryService.getById(id);
            res.status(200).send(inventory);
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Error retrieving inventory by id' });
        }
    },
    create: async (req, res) => {
        try {
            const newInventory = await inventoryService.create(req.body);
            const newInventoryResponse = `New inventory added successfully with id: ${newInventory} and name: ${req.body.name}`;
            res.status(200).json(newInventoryResponse);
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Error creating inventory' });
        }
    },
    update: async (req, res) => {
        const id = req.params.id;
        try {
            const updatedInventory = await inventoryService.update(id, req.body);
            const updatedInventoryResponse = `Inventory updated successfully with id: ${id} and name: ${req.body.name}`;
            res.status(200).json(updatedInventoryResponse);
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Error updating inventory' });
        }
    },
    delete: async (req, res) => {
        const id = req.params.id;
        try {
            const deletedInventory = await inventoryService.delete(id);
            const deletedInventoryResponse = `Inventory deleted successfully with id: ${id}`;
            res.status(200).json(deletedInventoryResponse);
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Error deleting inventory' });
        }
    }
}