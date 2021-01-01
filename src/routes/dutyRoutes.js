/* eslint-disable prefer-destructuring */
import express from 'express';
import createDuty from '../controllers/dutyController';
import auth from '../config/auth';

const router = express.Router();

router.post('/duty/:dutyid', auth, createDuty);

export default router;
