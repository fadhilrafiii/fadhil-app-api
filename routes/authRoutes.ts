import express, { Router } from 'express';

import {
  authenticateController,
  loginController,
  logoutController,
  registerController,
} from 'controllers/auth';

const authRoutes: Router = express.Router();

authRoutes.post('/authenticate', authenticateController);
authRoutes.post('/login', loginController);
authRoutes.post('/logout', logoutController);
authRoutes.post('/register', registerController);

export default authRoutes;
