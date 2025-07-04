import { Router } from 'express';
import { register, login, whoami, logout } from '../controllers/auth.controller';
import { authenticateJwt } from '../middlewares/auth.middleware';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.post("/logout", logout);
router.get('/me' , authenticateJwt, whoami);


export default router;
