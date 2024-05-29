const todoModel = require('../models/todoModel');

const getTodos = async (req, res) => {
  try {
    const todos = await todoModel.getTodosByUserId(req.userId);
    res.json(todos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createTodo = async (req, res) => {
  try {
    const { task } = req.body;
    const newTodo = await todoModel.createTodo(req.userId, task);
    res.status(201).json(newTodo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateTodo = async (req, res) => {
  try {
    const { task, completed } = req.body;
    const updatedTodo = await todoModel.updateTodo(req.params.id, task, completed);
    if (updatedTodo) {
      res.json(updatedTodo);
    } else {
      res.status(404).json({ message: 'Todo not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteTodo = async (req, res) => {
  try {
    await todoModel.deleteTodo(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
};
