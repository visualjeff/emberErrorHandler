module.exports = function(app) {
  var express = require('express');
  var errorsRouter = express.Router();

  errorsRouter.get('/', function(req, res) {
    res.send({
      'errors': []
    });
  });

  errorsRouter.post('/', function(req, res) {
    res.status(201).end();
  });

  errorsRouter.get('/:id', function(req, res) {
    res.send({
      'errors': {
        id: req.params.id
      }
    });
  });

  errorsRouter.put('/:id', function(req, res) {
    res.send({
      'errors': {
        id: req.params.id
      }
    });
  });

  errorsRouter.delete('/:id', function(req, res) {
    res.status(204).end();
  });

  app.use('/api/errors', errorsRouter);
};
