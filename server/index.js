// To use it create some files under `mocks/`
// e.g. `server/mocks/ember-hamsters.js`
//
// module.exports = function(app) {
//   app.get('/ember-hamsters', function(req, res) {
//     res.send('hello');
//   });
// };

module.exports = function(app) {
    var globSync = require('glob').sync;
    var bodyParser = require('body-parser');
    var mocks = globSync('./mocks/**/*.js', {
        cwd: __dirname
    }).map(require);
    var proxies = globSync('./proxies/**/*.js', {
        cwd: __dirname
    }).map(require);

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: true
    }));

    //Allow CORS
    app.all('*', function(req, res, next) {
        if (!req.get('Origin')) return next();

        res.set('Access-Control-Allow-Origin', '*');
        res.set('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
        res.set('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type');

        if ('OPTIONS' == req.method) return res.status(200).end();
        next();
    });


    // Log proxy requests
    var morgan = require('morgan');
    app.use(morgan('dev'));

    mocks.forEach(function(route) {
        route(app);
    });
    proxies.forEach(function(route) {
        route(app);
    });
};
