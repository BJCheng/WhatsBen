import { UserValidator } from '../user-validator';
import { assert } from 'chai';

describe('UserValidator Tests', () => {
	it('validates handle', () => {
		const validator = new UserValidator({
			handle: '',
			name: ''
		});
		const errors = validator.validate([]);
		assert.lengthOf(errors, 2);
		assert.deepEqual(errors, ['invalid-handle', 'invalid-name']);
	});
});