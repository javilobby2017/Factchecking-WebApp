var express = require('express');
const app = require('../app');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.put('/', (req, res) => {
  res.send('Got a PUT request at /user')
})

router.delete('/', (req, res) => {
  res.send('Got a DELETE request at /user')
})

module.exports = router;
