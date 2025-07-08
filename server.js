const express = require('express');
const cors = require('cors');
const todoRoutes = require('./routes/todos');
const auth = require('./routes/auth');
const verifyToken = require("./middleware/verifyToken");


const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.use('/todos', verifyToken, todoRoutes);
app.use('/auth', auth);

app.listen(PORT,()=>{
    console.log(`server is running on http://localhost:${PORT}`);
})