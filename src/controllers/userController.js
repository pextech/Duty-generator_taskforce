/* eslint-disable prefer-destructuring */
/* eslint-disable consistent-return */
import bcrypt from 'bcrypt';

const User = require('../models').User;

// check if password is beyond 6 characters

function isValidPassword(password) {
  if (password.length >= 6) {
    return true;
  }
  return false;
}

// uses a regex to check if email is valid

function isValidEmail(email) {
  const re = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
  return re.test(String(email).toLowerCase());
}
const createUser = (req, res) => {
  if (!isValidEmail(req.body.email)) {
    return res.status(500).json({ status: 'error', message: 'Email address not formed correctly.' });
  } if (!isValidPassword(req.body.password)) {
    return res.status(500).json({ status: 'error', message: 'Password must be 8 or more characters.' });
  }
  bcrypt.hash(req.body.password, 10, ((err, hash) => {
    if (err) {
      return res.status(500).json({
        error: err,
      });
    }
    User.create({
      names: req.body.names,
      email: req.body.email,
      password: hash,

    }).then((user) => {
      res.status(201).json({
        status: 201,
        message: 'user created',
        user,

      });
    }).catch((error) => { res.status(500).json({ error }); });
  }));
};

export default createUser;
