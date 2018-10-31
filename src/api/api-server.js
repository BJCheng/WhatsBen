/* eslint-disable no-console */
import express from 'express';
import { setupRedis, redisClient } from './redis-client';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
setupRedis();

app.get('/', (req, res) => {
	res.send('Hello whatsapp clone!');
});

app.get('/redis-test', (req, res) => {
	redisClient.incr('inc-foo', (err, result) => {
		if (err) {
			console.error(err);
			res.status(500).send('redis increment error');
		} else {
			res.send(`New increment value is ${result}`);
		}
	});
});

app.get('/json-test', (req, res, next) => {
	redisClient.incr('inc-json-test', (err, result) => {
		if (err) {
			next(err);
		}
		else {
			res.json({ incResult: result });
		}
	});
});

app.listen(port, () => {
	console.log(`Express app listening at port ${port}`);
});