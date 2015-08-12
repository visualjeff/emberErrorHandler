module.exports = function(app) {
  var express = require('express');
  var router = express.Router();

  var force302Response = false,
      force401Response = false,
      force404Response = false,
      force500Errors = false;

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
    }
  }

      /*
      *  Usage:
      *  curl -X POST 'http://localhost:4200/api/errorCode/forceErrorCode?code=404'
      */
      router.post('/forceErrorCode', function(req, res) {
        var returnCode = req.query.code;
        if (returnCode === '302') {
          force302Response = true;
          force401Response = false;
          force404Response = false;
          force500Errors = false;
        } else if (returnCode === '401') {
          force302Response = false;
          force401Response = true;
          force404Response = false;
          force500Errors = false;
        } else if (returnCode === '404') {
          force302Response = false;
          force401Response = false;
          force404Response = true;
          force500Errors = false;
        } else if(returnCode === '500') {
          force302Response = false;
          force401Response = false;
          force404Response = false;
          force500Errors = true;
        }
        res.send({'force302Response': force302Response, 'force401Response': force401Response, 'force404Response': force404Response, 'force500Errors': force500Errors});
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
