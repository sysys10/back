import { Request, Response } from 'express';
import * as AuthService from '../services/authService.js';

export const registerHandler = async (req: Request, res: Response) => {
  try {
    const {login_id, username, email, password,phone_number } = req.body;
    console.log(req.body);
    const user = await AuthService.register(login_id,username, email, password,phone_number);
    res.status(201).json({ message: 'User registered successfully', user });
  } catch (error) {
    res.status(400).json({ message: 'Registration failed', error: error });
  }
};

export const loginHandler = async (req: Request, res: Response) => {
  try {
    const { login_id, password } = req.body;
    const { user, accessToken, refreshToken } = await AuthService.login(login_id, password);
    
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.json({ user, accessToken });
  } catch (error) {
    res.status(401).json({ message: 'Login failed', error: error });
  }
};

export const refreshTokenHandler = async (req: Request, res: Response) => {
  try {
    const { refreshToken } = req.cookies;
    if (!refreshToken) {
      return res.status(401).json({ message: 'Refresh token not found' });
    }

    const { accessToken, refreshToken: newRefreshToken } = await AuthService.refreshToken(refreshToken);

    res.cookie('refreshToken', newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.json({ accessToken });
  } catch (error) {
    res.status(401).json({ message: 'Token refresh failed', error: error });
  }
};

export const logoutHandler = async (req: Request, res: Response) => {
  try {
    const { refreshToken } = req.cookies;
    if (refreshToken) {
      await AuthService.logout(refreshToken);
    }
    res.clearCookie('refreshToken');
    res.json({ message: 'Logged out successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Logout failed', error: error });
  }
};