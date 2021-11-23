import app from './config/express';

import Mime from './services/general/Mime';
import CronJob from './services/cronJob';

import {
  authenticate,
  genericErrorHandler,
  joiErrorHandler,
  notFoundErrorHandler,
  urlLogger
} from './middlewares';

import routes from './routes';

Mime.load();

// URL LOGGER
app.use(urlLogger);

// User Authentication
app.use(authenticate);

// Router
app.use('/', routes);

// Joi Error Handler
app.use(joiErrorHandler);

// Error Handler
app.use(notFoundErrorHandler);
app.use(genericErrorHandler);

const host = app.get('host');
const port = app.get('port');

app.listen(port, host, () => {
  console.log(`Server running at ${host}:${port}`); // eslint-disable-line no-console
  console.log(process.env.PORTAL__URL)
  CronJob.start();
});


export default app;
