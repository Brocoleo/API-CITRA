const express = require('express');
const cors = require('cors');
const routerApi = require('./routes');
//const path = require('path');

const { logErrors, errorHandler, boomErrorHandler, ormErrorHandler } = require('./middlewares/error.handler');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
const whitelist = ['http://localhost:3000', 'http://localhost:3001', 'https://mi-campo.vercel.app'];
const options = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('no permitido'));
    }
  }
}

app.use(cors(options));

require('./utils/auth');

app.use(logErrors);
app.use(ormErrorHandler);
app.use(boomErrorHandler);
app.use(errorHandler);

// directorio publico
//app.use( express.static('public'));

routerApi(app);

/*
app.use('*', (req, res) => {
  res.sendFile( path.resolve(__dirname, 'public/index.html' ));
})*/

app.listen(port, () => {
    console.log('Mi port' +  port);
});
