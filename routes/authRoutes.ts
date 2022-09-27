import express, { Router } from 'express';

import {
  authenticateController,
  loginController,
  logoutController,
  registerController,
} from 'controllers/auth';

import { isGuest } from 'middlewares/guest';

const authRoutes: Router = express.Router();

authRoutes.post('/authenticate', authenticateController);
authRoutes.post('/login', isGuest, loginController);
authRoutes.post('/logout', logoutController);
authRoutes.post('/register', isGuest, registerController);

export default authRoutes;
