/* eslint-disable max-len */
/* eslint-disable prefer-destructuring */
/* eslint-disable consistent-return */

const duties = require('../models').duties;

// to check if the name of duty is valid
function isValidName(name) {
  if (name.length >= 3 && name != null) {
    return true;
  }
  return false;
}

const createDuty = async (req, res) => {
  if (!isValidName(req.body.name)) {
    return res.status(500).json({ status: 'error', message: 'check the inputted name please' });
  }
  duties.create({
    name: req.body.name,
    content: req.body.content,
    dutyid: req.params.dutyid,

  }).then((duty) => {
    res.status(201).json({
      status: 201,
      message: 'duty successfuly created',
      duty,

    });
  }).catch((error) => { res.status(500).json({ error }); });
};

export default createDuty;
