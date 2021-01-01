/* eslint-disable prefer-destructuring */
import express from 'express';
import { createUser, userLogin, logout } from '../controllers/userController';
import auth from '../config/auth';

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
/**
 * @swagger
 * /login:
 *   post:
 *     tags:
 *       - User
 *     name: login
 *     summary: logs a new user in
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
 *     responses:
 *       200:
 *             description: user logged in successfully.
 *       400:
 *             description: Bad request.
 *       500:
 *             description: The password is incorrect or user isnt registered
 * */

/**
 * @swagger
 * /logout:
 *   post:
 *     tags:
 *       - User
 *     name: logout
 *     summary: logs a user out
 *     consumes:
 *       - application/json
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *             description: user logged out successfully.
 *       400:
 *             description: Bad request.
 *       500:
 *             description: can't log user out.
 * */

const router = express.Router();

router.post('/signUp', createUser);
router.post('/login', userLogin);
router.get('/logout', auth, logout);
export default router;
