const r2 = require("r2"); //fetch API on the server
const express = require('express');
const router = express.Router();

const base_url = 'https://s3.amazonaws.com/eight-public/challenge/';

//array list of all the URLs given.
//while these are hardcoded, I would expect the grab these from a database,
//maybe the file names are UUIDs and that would tell what file to pull.
const urls = [
	base_url+'2228b530e055401f81ba37b51ff6f81d.json',
	base_url+'d6c1355e38194139b8d0c870baf86365.json',
	base_url+'f9bf229fd19e4c799e8c19a962d73449.json'
];

//without this the asyn getUserData would not function.
//allows us to right async code in linear format making it easier to understand.
const asyncMiddleware = fn => (req, res, next) => {
	Promise.resolve(fn(req, res, next))
  	.catch(next);
};

//get the json data from amazon s3
const getUserData = async function(url) {
    try {
    	const response = await r2(url).json;
    	//console.log(response);
    	return response;
    } catch(e) {
    	// statements
    	console.log(e);
    	return {'ok': false, 'error': e};
    }
};

/* GET users listing by ID passed in URL */
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
