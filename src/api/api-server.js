/* eslint-disable no-console */
import express from 'express';
import { setupRedis } from './redis-client';
import setupRoutes from './routes';
import cors from 'cors';
import bodyParser from 'body-parser';
import setupSocketServer from './setup-socket-server';

const port = process.env.PORT || 4000;
const app = express();

app.use(cors());
app.use(bodyParser.json());
setupRedis();

const httpServer = app.listen(port, () => {
  console.log(`Express app listening at port ${port}`);
});
setupSocketServer(httpServer);
setupRoutes(app);