module.exports = function(app) {
  var express = require('express');
  var router = express.Router();


/*
 * Futures would be to move all of the variables associated with response codes.
 * Move them into a single object that contains a map of mocked codes.
 */

  var codes = new Map()
	  .set(401, false)
	  .set(404, false)
	  .set(500, false)
	  .set(501, false);

  var getResponse = function(res) {
    codes.forEach(function(value, key) {
      if (value) {
      	res.status(key);
	console.log("Sending " + key);
	return;
      }
    });
  }

  var resetErrorCodes = function() {
      codes.forEach(function(value, key) {
        if (value) {
	  codes.set(key, false);
	}
      });
  }

      /*
      *  Usage:
      *  curl -X POST 'http://localhost:4200/api/errorCode/forceErrorCode?code=404'
      */
      router.post('/forceErrorCode', function(req, res) {
	resetErrorCodes();
	codes.set(req.query.code, true);
        res.send(JSON.stringify(codes));
      });

  router.get('/', function(req, res) {
    getResponse(res);
    res.send({});
    /*
    res.send({
      'errorCode': []
    });
    */
  });

  router.post('/', function(req, res) {
    getResponse(res);
    res.end();
  });

  router.get('/:id', function(req, res) {
    getResponse(res);
    res.send({});
    /*
    res.send({
      'errorCode': {
      	id: req.params.id
      }
    });
    */
  });

  router.put('/:id', function(req, res) {
    getResponse(res);
    res.send({});
    /*
    res.send({
      'errorCode': {
      	id: req.params.id
      }
    });
    */
  });

  router.delete('/:id', function(req, res) {
    getResponse(res);
    res.end();
  });

  app.use('/api/errorCodes', router);
};
