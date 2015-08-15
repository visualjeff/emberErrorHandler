module.exports = function(app) {
  var express = require('express');
  var router = express.Router();


/*
 * Futures would be to move all of the variables associated with response codes.
 * Move them into a single object that contains a map of mocked codes.
 */

  var force302Response = false,
      force401Response = false,
      force404Response = false,
      force500Errors = false,
      force501Errors = false;

  var getResponse = function(res) {
    if (force302Response) {
      res.status(302);
      console.log('Sending 302.');
    } else if (force401Response) {
      res.status(401);
      console.log('Sending 401.');
    } else if (force404Response) {
      res.status(404);
      console.log('Sending 404.');
    } else if (force500Errors) {
      res.status(500);
      console.log('Sending 500.');
    } else if (force501Errors) {
      res.status(501);
      console.log('Sending 501');
    } else {
      console.log('');	    
      console.log('WARNING: The HTTP code you selected is not implemented in mock object.');
      console.log('Please update ==> server/mock/errorCodes.js');
      console.log('');
    }
  }

  var resetErrorCodes = function() {
      force302Response = false;
      force401Response = false;
      force404Response = false;
      force500Errors = false;
      force501Errors = false;
  }

      /*
      *  Usage:
      *  curl -X POST 'http://localhost:4200/api/errorCode/forceErrorCode?code=404'
      */
      router.post('/forceErrorCode', function(req, res) {
        var returnCode = req.query.code;
        resetErrorCodes();
	if (returnCode === '302') {
          force302Response = true;
        } else if (returnCode === '401') {
          force401Response = true;
        } else if (returnCode === '404') {
          force404Response = true;
        } else if(returnCode === '500') {
          force500Errors = true;
        } else if(returnCode === '501') {
          force501Errors = true;		
	} else {
          console.log('');
          console.log('WARNING: The HTTP code you selected is not implemented in mock object.');
          console.log('Please update ==> server/mock/errorCodes.js');
	  console.log('');
	}

        //res.send(JSON.stringify(mocked_codes));

        res.send({'force302Response': force302Response, 'force401Response': force401Response, 'force404Response': force404Response, 'force500Errors': force500Errors, 'force501Errors': force501Errors });

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
