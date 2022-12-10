const userService = require('../service/userService');
module.exports =  userController = {
    getAll: async (req, res) => {
        try {
            const users = await userService.getAll();
            res.status(200).json(users);
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Error retrieving users' });
        }
    },
    getById: async (req, res) => {
        const id = req.params.id;
        try {
            const user = await userService.getById(id);
            res.status(200).send(user);
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Error retrieving user by id' });
        }
    },
    create: async (req, res) => {
        try {
            const newUser = await userService.create(req.body);
            const newUserResponse = `New user added successfully with username: ${req.body.username}, email: ${req.body.email}, and role: ${req.body.role}`;
            res.status(200).json(newUserResponse);
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Error creating user' });
        }
    },
    update: async (req, res) => {
        const id = req.params.id;
        try {
            const updatedUser = await userService.update(id, req.body);
            const updatedUserResponse = `${req.body.username} successfuly updated account properties`;
            res.status(200).json(updatedUserResponse);
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Error updating user' });
        }
    },
    delete: async (req, res) => {
        const id = req.params.id;
        try {
            const deletedUser = await userService.delete(id);
            const deletedUserResponse = `${req.body.username} deleted successfully with id: ${id}`;
            res.status(200).json(deletedUserResponse);
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Error deleting user' });
        }
    } 
}

// imported userService from userService.js then created userController object with methods to get all users, get user by id, create user, update user, and delete user from the database.
