const express = require('express');
const router = express.Router();

router.get('/:userId', (req, res) => {
  const userData = {
    name: 'John Smith',
    id: req.params.userId
  };
  res.json(userData);
});

module.exports = router;