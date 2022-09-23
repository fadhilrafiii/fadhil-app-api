import express, { Router } from 'express';

import { loginController, registerController } from 'controllers/auth';

const router: Router = express.Router();

router.post('/register', registerController);

router.post('/login', loginController);

export default router;
