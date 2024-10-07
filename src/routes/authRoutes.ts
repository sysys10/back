import express from 'express';
import { registerHandler, loginHandler, refreshTokenHandler, logoutHandler } from '../controllers/authController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

// 회원가입
router.post('/register', registerHandler);

// 로그인
router.post('/login', loginHandler);

// 토큰 갱신
router.post('/refresh-token', refreshTokenHandler);

// 로그아웃 (인증된 사용자만 접근 가능)
router.post('/logout', authMiddleware, logoutHandler);

export default router;