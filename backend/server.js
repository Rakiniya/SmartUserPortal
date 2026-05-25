const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });
console.log("JWT SECRET =", 'mysecretkey');

const express = require('express');

const cors = require('cors');

const mongoose = require('mongoose');

const jwt = require('jsonwebtoken');

const bcrypt = require('bcryptjs');

const app = express();

const PORT = process.env.PORT || 3000;

// MIDDLEWARE
app.use(cors());

app.use(express.json());

// USER SCHEMA
const userSchema = new mongoose.Schema({

  userId: String,

  password: String,

  role: String

});

// USER MODEL
const User = mongoose.model(
  'User',
  userSchema
);

// DEFAULT USERS INSERT
async function createDefaultUsers() {

  try {

    const existingUsers = await User.find();

    if (existingUsers.length === 0) {

      await User.insertMany([

        {
          userId: 'admin',
          password: await bcrypt.hash(
            'admin123',
            10
          ),
          role: 'Admin'
        },

        {
          userId: 'john',
          password: await bcrypt.hash(
            'john123',
            10
          ),
          role: 'General User'
        }

      ]);

      console.log('Default Users Added');

    } else {

      console.log('Users Already Exist');
    }

  }

  catch (err) {

    console.log(err);
  }
}

// MONGODB CONNECTION
mongoose.connect(process.env.MONGO_URI)

  .then(async () => {

    console.log(
      'MongoDB Connected Successfully'
    );

    await createDefaultUsers();

  })

  .catch((err) => {

    console.log(err);

  });

// LOGIN API
app.post('/login', async (req, res) => {
  const { userId, password, role } = req.body;

  try {
    // STEP 1: find ONLY by userId
    const user = await User.findOne({ userId });

    if (!user) {
      return res.status(401).json({ message: 'Invalid Credentials' });
    }

    // STEP 2: check password safely
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid Credentials' });
    }

    // STEP 3: role check AFTER user is found
    if (role && user.role !== role) {
      return res.status(403).json({ message: 'Role mismatch' });
    }

    // STEP 4: generate token
    const secretKey = 'mysecretkey';

    console.log("SECRET KEY:", secretKey);

    const token = jwt.sign(
      {
        userId: user.userId,
        role: user.role
      },
      secretKey,
      {
        expiresIn: '1h'
      }
    );

    return res.status(200).json({
      token,
      user: {
        userId: user.userId,
        role: user.role
      }
    });

  } catch (err) {
    console.error("LOGIN ERROR:", err);
    return res.status(500).json({ message: err.message });
  }
});

// GET USERS API
app.get('/users', async (req, res) => {

  try {

    const users = await User.find();

    setTimeout(() => {

      res.status(200).json(users);

    }, 1500);

  }

  catch (err) {

    res.status(500).json(err);
  }

});

// ADD USER API
app.post('/users', async (req, res) => {

  try {

    const {
      userId,
      password,
      role
    } = req.body;

    const hashedPassword =
      await bcrypt.hash(password, 10);

    const newUser = new User({

      userId,

      password: hashedPassword,

      role

    });

    await newUser.save();

    res.status(201).json({
      message: 'User Added Successfully'
    });

  }

  catch (err) {

    res.status(500).json(err);
  }

});

// DELETE USER API
app.delete('/users/:userId', async (req, res) => {

  try {

    const userId = req.params.userId;

    await User.deleteOne({
      userId: userId
    });

    res.status(200).json({
      message: 'User Deleted Successfully'
    });

  }

  catch (err) {

    res.status(500).json(err);
  }

});

// GET RECORDS API
app.get('/records/:role', (req, res) => {

  const role = req.params.role;

  let records = [];

  // ADMIN RECORDS
  if (role === 'Admin') {

    records = [

      {
        id: 1,
        name: 'Finance Reports',
        access: 'Full Access'
      },

      {
        id: 2,
        name: 'HR Records',
        access: 'Full Access'
      },

      {
        id: 3,
        name: 'System Logs',
        access: 'Full Access'
      }
    ];

  }

  // GENERAL USER RECORDS
  else {

    records = [

      {
        id: 1,
        name: 'User Profile',
        access: 'Limited Access'
      },

      {
        id: 2,
        name: 'Project Files',
        access: 'Limited Access'
      }
    ];
  }

  // API DELAY
  setTimeout(() => {

    res.status(200).json(records);

  }, 2000);

});

// START SERVER
app.listen(PORT, () => {

  console.log(
    `Server running on http://localhost:${PORT}`
  );

});