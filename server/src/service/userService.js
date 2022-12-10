const db = require('../config/db');

 module.exports = userService = {
    getAll: async () => {
        const users = await db('users');
        return users;
    },
    getById: async (id) => {
        const user = await db('users').where({ id: id }).first();
        return user;
    },
    create: async (user) => {
        const newUser = await db('users').insert(user);
        return newUser;
    },
    update: async (id, user) => {
        const updatedUser = await db('users').where({ id: id }).update({
            first_name: user.first_name,
            last_name: user.last_name,
            username: user.username,
            password: user.password,
            email: user.email,
            role: user.role
        });
        return updatedUser;
    },
    delete: async (id) => {
        const deletedUser = await db('users').where({ id: id }).del();
        return deletedUser;
    },

        
}

// imported knex from db.js then created userService object with methods to get all users, get user by id, create user, update user, and delete user from the database.

//note update method is function, the endpoint is /user/:id. The id is the id of the user to be updated. The user object is the updated user object. The user object is passed in as the second argument to the update method. The update method uses the id to find the user to be updated and then updates the user with the properties of the user object passed in as the second argument.