const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/', async (req, res) => {
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/users');
      res.json(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).json({ error: 'Failed to fetch users' });
    }
  });
  
router.get('/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const response = await axios.get(`https://jsonplaceholder.typicode.com/users/${userId}`);
    const user = response.data;

    res.render('user', { id: userId, name: user.name });
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ error: 'Failed to fetch user data' });
  }
});

module.exports = router;
