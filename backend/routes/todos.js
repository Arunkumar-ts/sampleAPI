const express = require('express');
const fs = require('fs');
const router = express.Router();

const TODOS_FILE = 'todos.json';

function readTodos() {
  try {
    const data = fs.readFileSync(TODOS_FILE);
    // console.log(JSON.parse(data));
    return JSON.parse(data);
  } catch {
    return [];
  }
}

function saveTodos(todos) {
  fs.writeFileSync(TODOS_FILE, JSON.stringify(todos, null, 2));
}

// All todos routes
router.get('/',  (req, res) => {
  const todos = readTodos();
  res.json(todos);
});

router.post('/', (req, res) => {
  const todos = readTodos();

  if (req.body.todoName) {
    const newTodo = {
      id: Date.now(),
      todoName: req.body.todoName,
      completed: false, 
      created_At: new Date().toLocaleDateString("en-GB"), 
    };
    todos.push(newTodo);
    saveTodos(todos);
    res.status(201).json({
      "message": "success"
    });
  }
  else {
    res.status(400).json({
      "error": "Missing required field"
    });

  }
});

router.put('/:id', (req, res) => {
  const todos = readTodos();
  const todo = todos.find(t => t.id === parseInt(req.params.id));
  if (!todo) return res.status(404).send('Todo not found');
  
  // console.log(completed);
  const { completed } = req.body;
  // todos.map((todo)=>{
  //   todo.id === parseInt(req.params.id) ? todo.completed = completed : todo
  // })

  todo.completed = completed;

  saveTodos(todos);
  res.json(todo);
});

router.delete('/:id', (req, res) => {
  let todos = readTodos();
  const isIt = todos.find(t => t.id === parseInt(req.params.id));
  if (isIt) {
    todos = todos.filter(t => t.id !== parseInt(req.params.id));
    saveTodos(todos);
    res.status(204).json({ "message": "Success" });
  }
  else {
    res.status(404).json({ "message": "Failed" })
  }

});

module.exports = router;
