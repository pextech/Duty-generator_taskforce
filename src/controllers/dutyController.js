/* eslint-disable max-len */
/* eslint-disable prefer-destructuring */
/* eslint-disable consistent-return */

import jwt from 'jsonwebtoken';

const duties = require('../models').duties;
const users = require('../models').users;

// to check if the name of duty is valid
function isValidName(title) {
  if (title.length >= 3 && title != null) {
    return true;
  }
  return false;
}

export const createDuty = async (req, res) => {
  if (req.body.title || req.body.description || req.body.priority) {
    const token = req.headers.authorization.split(' ')[1];
    const { email } = jwt.decode(token);

    const user = await users.findOne({ where: { email } });

    if (req.body.title == null) {
      return res.status(400).json(
        {
          message: 'title is required.',
          status: 'error',
          data: null,
        },
      );
    }
    if (req.body.description == null) {
      return res.status(400).json(
        {
          message: 'description is required.',
          status: 'error',
          data: null,
        },
      );
    }
    if (req.body.priority == null) {
      return res.status(400).json(
        {
          message: 'priority is required.',
          status: 'error',
          data: null,
        },
      );
    }

    if (user < 1) {
      (res.status(500).json({ status: 500, message: 'authentication errored, make sure you are logged in' }));
    }
    if (!isValidName(req.body.title)) {
      return res.status(500).json({ status: 'error', message: 'check the inputted title please' });
    }
    // creating a duty

    duties.create({
      title: req.body.title,
      description: req.body.description,
      priority: req.body.priority,
      dutyid: user.id,

    }).then((duty) => {
      res.status(201).json({
        status: 201,
        message: 'duty successfuly created',
        duty,

      });
    }).catch((error) => { res.status(500).json({ error }); });
  } else {
    return res.status(400).json(
      {
        message: 'Invalid JSON payload passed.',
        status: 'error',
        data: null,
      },
    );
  }
};

export const getDuties = async (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  const { email } = jwt.decode(token);
  // const user = await users.findOne({ where: { email } });

  users.findAll({
    include: [{
      model: duties,
      as: 'duties',
    }],
    where: { email },
  }).then((userDuties) => {
    res.status(200).json({ status: '200', message: `returned all duties for ${email}`, userDuties });
  }).catch((err) => {
    (res.status(500).json({ status: 500, err, message: 'authentication errored, make sure you are logged in' }));
  });
};

export const updateDuties = async (req, res) => {
  if (req.body.title || req.body.description || req.body.priority) {
    const token = req.headers.authorization.split(' ')[1];
    const { email } = jwt.decode(token);
    const user = await users.findOne({ where: { email } });
    const dutyid = user.id;
    const id = req.params.id;
    const body = req.body;
    const duty = await duties.findOne({ where: { id, dutyid } });
    if (duty < 1) {
      (res.status(500).json({ status: 500, message: 'there is no duty with such id' }));
    } else {
      duties.update(req.body, { fields: Object.keys(req.body), where: { id } }).then(() => {
        res.status(201).json({ status: '201', message: ` updated duty by ${email}`, body });
      }).catch((err) => {
        (res.status(500).json({ status: 500, err, message: 'authentication errored, make sure you are logged in' }));
      });
    }
  } else {
    return res.status(400).json(
      {
        message: 'Invalid JSON payload passed.',
        status: 'error',
        data: null,
      },
    );
  }
};

export const getOneDuty = async (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  const { email } = jwt.decode(token);
  const user = await users.findOne({ where: { email } });
  const dutyid = user.id;
  const id = req.params.id;
  const duty = await duties.findOne({ where: { id, dutyid } });
  if (duty < 1) {
    (res.status(500).json({ status: 500, message: 'there is no duty with such id' }));
  } else {
    duties.findOne({ where: { id } }).then((userDuty) => {
      res.status(201).json({ status: '200', message: ` fetched one duty by ${email}`, userDuty });
    }).catch((err) => {
      (res.status(500).json({ status: 500, err, message: 'authentication errored, make sure you are logged in' }));
    });
  }
};

export const clearDuty = async (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  const { email } = jwt.decode(token);
  const user = await users.findOne({ where: { email } });
  const dutyid = user.id;
  const id = req.params.id;
  const duty = await duties.findOne({ where: { id, dutyid } });
  if (duty < 1) {
    (res.status(500).json({ status: 500, message: 'authorisation denied.' }));
  }
  duties.destroy({ where: { id, complete: true } }).then(() => {
    res.status(201).json({ status: '200', message: ` deleted one duty by ${email}` });
  }).catch((err) => {
    (res.status(500).json({ status: 500, err, message: 'authorisation denied.' }));
  });
};
