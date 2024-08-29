// server.js
const express = require('express');
const connectToDatabase = require('./Db');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

let db;
connectToDatabase().then(database => {
  db = database;
});

// Endpoint to register a new user
app.post('/register', async (req, res) => {
  console.log("dfdf")
  const { name, email, password } = req.body;

  try {
    // Check if the email already exists
    const existingUser = await db.collection('DbLogin').findOne({ email: email });
    console.log(existingUser)
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'Email already exists, please login' });
    }

    // Save user data to MongoDB
    const result = await db.collection('users').insertOne({ name, email, password });
    console.log('User registered:', result);


    res.json({ success: true, message: 'Registration successful, please login' });

  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

app.post('/Login', async (req, res) => {
  const { email, password } = req.body;
  try {
    console.log("existingUser")
    // Check if the email already exists
    const existingUser = await db.collection('users').findOne({ email: email });
    if (existingUser) {
      if(password == existingUser.password){
        res.status(500).json({ success: true, message: 'Password correct' });
      }else{
        res.status(500).json({ success: false, message: 'Password Incorrect' });
      }
    }

  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
