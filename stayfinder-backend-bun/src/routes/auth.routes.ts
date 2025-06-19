import { Router } from 'express';
import { register, login, whoami } from '../controllers/auth.controller';
import { authenticateJwt } from '../middlewares/auth.middleware';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.get('/me' , authenticateJwt, whoami);


export default router;
