/* eslint-disable no-unused-vars */
import express from 'express';
import Sequelize from 'sequelize';
import documentation from './documentation';
import user from './userRoutes';
import duties from './dutyRoutes';

const router = express.Router();

router.use('/api/v1/', documentation);
router.use('/api/v1/', user);
router.use('/api/v1/', duties);
router.get('/api/v1/', (req, res) => {
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
