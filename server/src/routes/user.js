const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

///GET ALL USERS///

router.route('/').get(userController.getAll)
                .post(userController.create);
router
    .route('/:id')
    .get(userController.getById)
    .put(userController.update)
    .delete(userController.delete);

module.exports = router;


//imported express, created router, and imported userController from userController.js
//created routes for get all users, get user by id, create user, update user, and delete user
//exported router
