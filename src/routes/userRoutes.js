/* eslint-disable prefer-destructuring */
import express from 'express';
import createUser from '../controllers/userController';

/**
 * @swagger
 * /signUp:
 *   post:
 *     tags:
 *       - User
 *     name: Signup
 *     summary: Creates a new user
 *     consumes:
 *       - application/json
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *                email:
 *                 type: string
 *                password:
 *                 type: string
 *                names:
 *                 type: string
 *     responses:
 *       201:
 *             description: user created successfully.
 *       400:
 *             description: Bad request.
 *       409:
 *             description: The email is already in the system.
 * */

const router = express.Router();

router.post('/signUp', createUser);

export default router;
