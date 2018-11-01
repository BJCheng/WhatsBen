import { redisClient } from './redis-client';
import { UserValidator } from '../core/user-validator';

export default (app) => {
	app.get('/', (req, res) => {
		res.send('Hello whatsapp clone!');
	});

	app.get('/redis-test', (req, res) => {
		redisClient.incr('inc-foo', (err, result) => {
			if (err) {
				console.error(err); // eslint-disable-line
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

	app.post('/user', (req, res, next) => {
		console.log('user', req.body);
		const { handle, name } = req.body;
		const user = {
			handle,
			name
		};
		const validator = new UserValidator(user);
		const validationErrors = validator.validate([{ handle: '1' }]);
		if (validationErrors.length > 0) {
			console.error('validation errors', validationErrors);
			res.status(500).send(validationErrors);
		} else {
			redisClient.lpush('users', JSON.stringify(user), (err, result) => {
				if (err) {
					next(err);
				}
				else {
					res.send(`User saved to redis. Number of users: ${result}.`);
				}
			});
		}
	});
};