const express = require('express');
const fs = require('fs');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config();


const USERS_FILE = 'users.json';

function readUsers() {
  try {
    const data = fs.readFileSync(USERS_FILE);
    // console.log(JSON.parse(data));
    return JSON.parse(data);
  } catch {
    return [];
  }
}

function saveUsers(todos) {
  fs.writeFileSync(USERS_FILE, JSON.stringify(todos, null, 2));
}

// Register
router.post('/register', (req,res)=>{
  const {userName, password} = req.body;
  const users = readUsers();

  if(users.find(u => u.userName === userName)){
    return res.status(400).json({
      message: "User already exists"
    });
  }

  const hashedPassword = bcrypt.hashSync(password, 10);
  users.push({
    id:Date.now(),
    userName: userName,
    password: hashedPassword
  });
  saveUsers(users);
  res.json({
    message:"User Registered"
  });
});

// Login
router.post("/login", (req,res)=>{
  const {userName, password} = req.body;
  const users = readUsers();

  const user = users.find(u => u.userName === userName );
  if(!user){
    return res.status(400).json({
      error:"Invalid UserName or Password"
    });
  }
  
  const isMatch = bcrypt.compareSync(password, user.password);
  if(!isMatch){
    return res.status(400).json({
      error:"Invalid UserName or Password"
    });
  }

  const token = jwt.sign({id:user.id, userName: userName}, process.env.JWT_SECRET_KEY , { expiresIn : "1h"});
  res.json({token});
  
});


module.exports = router;
