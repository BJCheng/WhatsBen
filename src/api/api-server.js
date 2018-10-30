import express from 'express';
import { setupRedis, redisClient } from './redis-client';

const app = express();
const port = process.env.PORT || 4000;

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

app.listen(port, () => {
	console.log(`Express app listening at port ${port}`);
});