import { redisClient } from './redis-client';
import { UserValidator } from '../core/user-validator';
import jwt from 'jsonwebtoken';

const handleSecret = 'random-secret';

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
					const token = jwt.sign({handle}, handleSecret);
					console.info(jwt);
					res.json({
						token: `Bearer ${token}`
					});
				}
			});
		}
	});

	app.get('verify', (req, res)=>{
		const bearerToken  = req.header('Authorization');
		const token = bearerToken.substring('Bearer '.length);
		const decoded = jwt.verify(token, handleSecret);
		res.send(decoded.handle);
	});
};