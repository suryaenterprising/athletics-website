import express from 'express';
import { signup, login, adminLogin } from '../controllers/authController.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);           // user login
router.post('/admin/login', adminLogin); // admin login

export default router;
