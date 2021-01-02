/* eslint-disable prefer-destructuring */
import express from 'express';
import {
  createDuty, getDuties, updateDuties, getOneDuty, clearDuty,
} from '../controllers/dutyController';
import auth from '../config/auth';

/**
 * @swagger
 * /duty:
 *   post:
 *     tags:
 *       - Duties
 *     summary: Update a User's duty
 *     content:
 *       - application/json
 *     parameters:
 *       - name: auth
 *         in: header
 *         required: true
 *       - name: body
 *         in: body
 *         schema:
 *             properties:
 *                name:
 *                 type: string
 *                content:
 *                 type: string
 *                complete:
 *                 type: boolean
 *     responses:
 *       200:
 *             description: User Duty successfully Created.
 *       400:
 *             description: Bad request.
 *       401:
 *             description: unauthorized
 *       500:
 *             description: Error creating Duty
 * */
/**
 * @swagger
 * /duty:
 *   get:
 *     tags:
 *       - Duties
 *     summary: retrieve a User's duties
 *     content:
 *       - application/json
 *     parameters:
 *       - name: token
 *         in: header
 *         required: true
 *     responses:
 *       200:
 *             description: User Duties successfully retrieved.
 *       400:
 *             description: Bad request.
 *       401:
 *             description: unauthorized
 *       500:
 *             description: Error retrieving Duty
 * */
/**
 * @swagger
 * /duty/{id}:
 *   patch:
 *     tags:
 *       - Duties
 *     summary: Update a User's duty
 *     content:
 *       - application/json
 *     parameters:
 *       - name: token
 *         in: header
 *         required: true
 *       - name: body
 *         in: body
 *         schema:
 *             properties:
 *                name:
 *                 type: string
 *                content:
 *                 type: string
 *                complete:
 *                 type: boolean
 *     responses:
 *       200:
 *             description: User Duty successfully updated.
 *       400:
 *             description: Bad request.
 *       401:
 *             description: unauthorized
 *       500:
 *             description: Error updating Duty
 * */
/**
 * @swagger
 * /duty/{id}:
 *   get:
 *     tags:
 *       - Duties
 *     summary: get one User's duty
 *     content:
 *       - application/json
 *     parameters:
 *       - name: token
 *         in: header
 *         required: true
 *     responses:
 *       200:
 *             description: User Duty successfully retrieved.
 *       400:
 *             description: Bad request.
 *       401:
 *             description: unauthorized
 *       500:
 *             description: Error retriving Duty
 * */
/**
 * @swagger
 * /duty/{id}:
 *   delete:
 *     tags:
 *       - Duties
 *     summary: delete a User's duty
 *     content:
 *       - application/json
 *     parameters:
 *       - name: token
 *         in: header
 *         required: true
 *     responses:
 *       200:
 *             description: User Duty successfully deleted.
 *       400:
 *             description: Bad request.
 *       401:
 *             description: unauthorized
 *       500:
 *             description: Error deleting Duty
 * */
const router = express.Router();

router.post('/duty', auth, createDuty);
router.get('/duty', auth, getDuties);
router.patch('/duty/:id', auth, updateDuties);
router.get('/duty/:id', auth, getOneDuty);
router.delete('/duty/:id', auth, clearDuty);

export default router;
