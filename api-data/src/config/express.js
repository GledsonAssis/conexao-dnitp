import {
  json,
  urlencoded,
} from 'body-parser';
import dotenv from 'dotenv';
import express from 'express';
import helmet from 'helmet';

import allowCors from './cors';

const app = express();

dotenv.config();

app.set('host', process.env.APP_HOST || 'localhost');
app.set('port', process.env.APP_PORT || 7001);

app.use(express.static("public"));
app.use(helmet());
app.use(allowCors);
app.use(urlencoded({ extended: true }));
app.use(json({
  limit: process.env.APP_LIMIT_REQUEST_SIZE,
}));

export default app;
