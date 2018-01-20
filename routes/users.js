const r2 = require("r2");
const express = require('express');
const router = express.Router();

const urls = [
	'https://s3.amazonaws.com/eight-public/challenge/2228b530e055401f81ba37b51ff6f81d.json',
	'https://s3.amazonaws.com/eight-public/challenge/d6c1355e38194139b8d0c870baf86365.json',
	'https://s3.amazonaws.com/eight-public/challenge/f9bf229fd19e4c799e8c19a962d73449.json'
];

const asyncMiddleware = fn => (req, res, next) => {
	Promise.resolve(fn(req, res, next))
  	.catch(next);
};

const getUserData = async function(url) {
    try {
    	const response = await r2(url).json;
    	//console.log(response);
    	return response;
    } catch(e) {
    	// statements
    	console.log(e);
    }
};

/* GET users listing. */
router.get('/:id', asyncMiddleware(async (req, res, next) => {
  /* 
	if there is an error thrown in getUserData, asyncMiddleware
	will pass it to next() and express will handle the error;
  */
  var id = req.params.id;
  if(!id){
  	id = 1;
  }
  const data = await getUserData(urls[id-1]);
  res.json(data);
}));

module.exports = router;
