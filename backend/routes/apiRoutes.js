const express = require('express');
const userController = require('../controllers/userController');
const todoController = require('../controllers/todoController');

const router = express.Router();

router.post('/signup', userController.signUp);
router.post('/login', userController.login);

router.use(userController.authenticate);

router.get('/todos', todoController.getTodos);
router.post('/todos', todoController.createTodo);
router.put('/todos/:id', todoController.updateTodo);
router.delete('/todos/:id', todoController.deleteTodo);

module.exports = router;
