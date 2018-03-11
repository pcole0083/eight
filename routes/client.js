var express = require('express');
var path = require('path');
var router = express.Router();

/* GET assets. */
router.get('*', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../build/'+req._parsedOriginalUrl.pathname));
});

module.exports = router;
