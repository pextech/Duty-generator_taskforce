/* eslint-disable prefer-destructuring */
/* eslint-disable consistent-return */
import bcrypt from 'bcrypt';

const users = require('../models').users;

// check if password is beyond 6 characters

function isValidPassword(password) {
  if (password.length >= 6) {
    return true;
  }
  return false;
}
// check if name is available

function isValidName(name) {
  if (name.length >= 3 && name != null) {
    return true;
  }
  return false;
}

// uses a regex to check if email is valid

function isValidEmail(email) {
  const re = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
  return re.test(String(email).toLowerCase());
}
const createUser = async (req, res) => {
  if (!isValidName(req.body.name)) {
    return res.status(500).json({ status: 'error', message: 'check the inputted name please' });
  }
  if (!isValidEmail(req.body.email)) {
    return res.status(500).json({ status: 'error', message: 'Email address not formed correctly.' });
  } if (!isValidPassword(req.body.password)) {
    return res.status(500).json({ status: 'error', message: 'Password must be 6 or more characters.' });
  }
  const findUser = await users.findOne({ where: { email: req.body.email } });
  if (findUser) {
    (res.status(500).json({ status: 500, message: 'User alredy exist' }));
  } else {
    bcrypt.hash(req.body.password, 10, ((err, hash) => {
      if (err) {
        return res.status(500).json({
          error: err,
        });
      }
      users.create({
        name: req.body.name,
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
  }
};

export default createUser;
