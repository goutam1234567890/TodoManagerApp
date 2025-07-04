const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todoController');
const auth = require('../middleware/auth');

// All todo routes are now protected
router.get('/', auth, todoController.getTodos);
router.post('/', auth, todoController.createTodo);
router.put('/:id', auth, todoController.updateTodo);
router.delete('/:id', auth, todoController.deleteTodo);

module.exports = router;
