module.exports = function(app) {
  var express = require('express');
  var errorRouter = express.Router();

  var force302Response = false,
      force401Response = false,
      force404Response = false,
      force500Errors = false;

  var getResponse = function(res) {
    if (force302Response) {
      res.status(302).send(standardResponse);
      console.log('Sending 302.');
    } else if (force401Response) {
      res.status(401).send(standardResponse);
      console.log('Sending 401.');
    } else if (force404Response) {
      res.status(404).send(standardResponse);
      console.log('Sending 404.');
    } else if (force500Errors) {
      res.status(500).send();
      console.log('Sending 500.');
    } else {
      res.send(payload);
    }
  }

      /*
      *  Usage:
      *  curl -X POST http://localhost:4200/eam/v1/api/forceReturnCode?code=302
      *  curl -X POST http://localhost:4200/eam/v1/api/forceReturnCode?code=404
      *  curl -X POST http://localhost:4200/eam/v1/api/forceReturnCode?code=500
      *  Reset:
      *  curl -X POST http://localhost:4200/eam/v1/api/forceError
      * */
      router.post('/forceReturnCode', function(req, res) {
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
        } else {
          force302Response = false;
          force401Response = false;
          force404Response = false;
          force500Errors = false;
        }
        res.send({'force302Response': force302Response, 'force401Response': force401Response, 'force404Response': force404Response, 'force500Errors': force500Errors});
      });

  errorRouter.get('/', function(req, res) {
    getResponse(res);
    res.send({
      'error': []
    });
  });

  errorRouter.post('/', function(req, res) {
    getResponse(res);
    res.end();
  });

  errorRouter.get('/:id', function(req, res) {
    getResponse(res);
    res.send({
      'error': {
        id: req.params.id
      }
    });
  });

  errorRouter.put('/:id', function(req, res) {
    getResponse(res);
    res.send({
      'error': {
        id: req.params.id
      }
    });
  });

  errorRouter.delete('/:id', function(req, res) {
    getResponse(res);
    res.end();
  });

  app.use('/api/error', errorRouter);
};
