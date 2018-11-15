import validator from 'validator';

export class UserValidator {
  constructor(user) {
    this._user = user;
  }

  validate(existingUsers) {
    const errors = [];
    if (!validator.isLength(this._user.handle, 1, 16)) {
      errors.push('invalid-handle');
    }
    if (!validator.isLength(this._user.name, 1, 100)) {
      errors.push('invalid-name');
    }

    if (existingUsers.find(user => user.handle === this._user.handle))
      errors.push('duplicate handle');
    return errors;
  }
}