const express = require('express');

const cors = require('cors');

const app = express();

const PORT = 3000;

// MIDDLEWARE
app.use(cors());

app.use(express.json());

// DUMMY DATABASE
let users = [

  {
    userId: 'admin',
    password: 'admin123',
    role: 'Admin'
  },

  {
    userId: 'john',
    password: 'john123',
    role: 'General User'
  }

];

// LOGIN API
app.post('/login', (req, res) => {

  const {
    userId,
    password,
    role
  } = req.body;

  const user = users.find(
    (u) =>
      u.userId === userId &&
      u.password === password &&
      u.role === role
  );

  // API DELAY
  setTimeout(() => {

    if (user) {

      res.status(200).json(user);

    } else {

      res.status(401).json({
        message: 'Invalid Credentials'
      });
    }

  }, 1000);

});

// GET USERS API
app.get('/users', (req, res) => {

  console.log('GET USERS');

  // API DELAY
  setTimeout(() => {

    res.status(200).json(users);

  }, 1500);

});

// ADD USER API
app.post('/users', (req, res) => {

  const newUser = req.body;

  users.push(newUser);

  res.status(201).json({
    message: 'User Added Successfully'
  });

});

// DELETE USER API
app.delete('/users/:userId', (req, res) => {

  const userId = req.params.userId;

  users = users.filter(
    (u) => u.userId !== userId
  );

  res.status(200).json({
    message: 'User Deleted Successfully'
  });

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