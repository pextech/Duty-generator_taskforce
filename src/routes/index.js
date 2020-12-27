/* eslint-disable no-unused-vars */
import express from 'express';
import Sequelize from 'sequelize';
import documentation from './documentation';

const router = express.Router();

router.use('/', documentation);
router.get('/', (req, res) => {
  res.status(200).json({ status: 200, message: 'Hey, you made it to my Duties generator app, have fun' });
});
router.use((req, res) => {
  const error = new Error('Page Not found');
  res.status(404).json({

    error: {
      message: error.message,
    },
  });
});

export default router;
