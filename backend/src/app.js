const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');

const loginRouter = require('./resources/login/login.router');
const logupRouter = require('./resources/logup/logup.router');
const userRouter = require('./resources/users/user.router');
const chartRouter = require('./resources/chart/chart.router');
const statsRouter = require('./resources/stats/stats.router');

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));
const middlewareAuth = require('./resources/login/login.middleware');

app.use(helmet());
app.use(cors());
app.use(express.json());

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

app.use('/login', loginRouter);

app.use('/logup', logupRouter);

app.use('/chart', chartRouter);

app.use(middlewareAuth);

app.use('/users', userRouter);

userRouter.use('/:id/stats', statsRouter);

module.exports = app;
