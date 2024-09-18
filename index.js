const express = require('express');
const cors = require('cors');
const fs = require('fs');
const app = express();
 app.use(cors());

app.use(express.json());

app.post('/register', (req, res) => {
  const userData = req.body;
  console.log(userData);
  // Write data to a JSON file
  fs.readFile('users.json', (err, data) => {
    if (err) {
      
      return res.status(500).json({ message: 'Error reading file' });
    }
    
    const users = JSON.parse(data);
    console.log(users);
    users.push(userData);

    fs.writeFile('users.json', JSON.stringify(users, null, 2), (err) => {
      if (err) {
        return res.status(500).json({ message: 'Error writing file' });
      }
      res.status(200).json({ message: 'Registration successful!' });
    });
  });
});

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
