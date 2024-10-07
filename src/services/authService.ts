import bcrypt from "bcrypt";
import { AppDataSource } from "../config/typeorm.config.js";
import { User } from "../entities/User.js";
import { RefreshToken } from "../entities/RefreshToken.js";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/jwtUtils.js";

export const register = async (
  login_id: string,
  username: string,
  email: string,
  password: string,
  phone_number: string
) => {
  const userRepository = AppDataSource.getRepository(User);
  const existingUser = await userRepository.findOne({ where: { email } });
  if (existingUser) {
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = userRepository.create({
    login_id,
    username,
    email,
    password: hashedPassword,
    phone_number
  });
  return await userRepository.save(user);
};

export const login = async (login_id: string, password: string) => {
  const userRepository = AppDataSource.getRepository(User);
  const user = await userRepository.findOne({ where: { login_id } });
  if (!user) {
    throw new Error("Invalid credentials");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error("Invalid credentials");
  }

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  const refreshTokenRepository = AppDataSource.getRepository(RefreshToken);
  const newRefreshToken = refreshTokenRepository.create({
    token: refreshToken,
    user,
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
  });
  await refreshTokenRepository.save(newRefreshToken);

  return { user, accessToken, refreshToken };
};

export const refreshToken = async (refreshToken: string) => {
  const refreshTokenRepository = AppDataSource.getRepository(RefreshToken);
  const existingToken = await refreshTokenRepository.findOne({
    where: { token: refreshToken },
    relations: ["user"],
  });

  if (
    !existingToken ||
    existingToken.isRevoked ||
    existingToken.expiresAt < new Date()
  ) {
    throw new Error("Invalid refresh token");
  }

  const { user } = existingToken;
  const newAccessToken = generateAccessToken(user);
  const newRefreshToken = generateRefreshToken(user);

  existingToken.token = newRefreshToken;
  existingToken.expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  await refreshTokenRepository.save(existingToken);

  return { accessToken: newAccessToken, refreshToken: newRefreshToken };
};

export const logout = async (refreshToken: string) => {
  const refreshTokenRepository = AppDataSource.getRepository(RefreshToken);
  const existingToken = await refreshTokenRepository.findOne({
    where: { token: refreshToken },
  });
  if (existingToken) {
    existingToken.isRevoked = true;
    await refreshTokenRepository.save(existingToken);
  }
};
