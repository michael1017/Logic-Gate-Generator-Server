const express = require('express');

const generatorRouter = require('./routers/generator.js');
const returnRouter = require('./routers/return.js');
const accessController = require('./middleware/accessController');
const errorHandler = require('./middleware/error-handler.js');

const app = express();

// app.use(requestLogger);
app.use(
  express.static('build', {
    setHeaders: (res, path, stat) => {
      res.set('Cache-Control', 'public, s-maxage=86400');
    },
  })
);
app.use(accessController);
app.use('/api/send', generatorRouter);
app.use('/api/', returnRouter);
app.get('/*', (req, res) => res.redirect('/'));
app.use(errorHandler);

const port = 8080;
app.listen(port, () => {
  console.log(`Server is up and running on port ${port}...`);
});
