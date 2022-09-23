import express, { Router } from 'express';

import { authenticateController, loginController, registerController } from 'controllers/auth';

const router: Router = express.Router();

router.post('/authenticate', authenticateController);
router.post('/login', loginController);
router.post('/register', registerController);

export default router;
