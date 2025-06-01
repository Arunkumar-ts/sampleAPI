const express = require('express');
const fs = require('fs');
const router = express.Router();

const TODOS_FILE = 'todos.json';

function readTodos() {
  try {
    const data = fs.readFileSync(TODOS_FILE);
    return JSON.parse(data);
  } catch {
    return [];
  }
}

function saveTodos(todos) {
  fs.writeFileSync(TODOS_FILE, JSON.stringify(todos, null, 2));
}


// All todos routes
router.get('/', (req, res) => {
  const todos = readTodos();
  res.json(todos);
});

router.post('/', (req, res) => {
  const todos = readTodos();
  const newTodo = {
    id: Date.now(),
    text: req.body.text,
    completed: false,
  };
  todos.push(newTodo);
  saveTodos(todos);
  res.status(201).json(newTodo);
});

router.put('/:id/:toggle', (req, res) => {
  const todos = readTodos();
  const todo = todos.find(t => t.id === parseInt(req.params.id));
  if (!todo) return res.status(404).send('Todo not found');

  const { completed } = req.query;
  console.log(completed);

  saveTodos(todos);
  res.json(todo);
});

router.delete('/:id', (req, res) => {
  let todos = readTodos();
  const isIt = todos.find(t => t.id === parseInt(req.params.id));
  if(isIt){
    todos = todos.filter(t => t.id !== parseInt(req.params.id));
    saveTodos(todos);
    res.json({"message":"Success"});
  }
  else{
    res.json({"message":"Failed"}) 
  }

  res.status(204).send();
});

module.exports = router;
