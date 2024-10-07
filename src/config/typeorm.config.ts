import "reflect-metadata";
import { DataSource } from "typeorm";

import { Event } from "../entities/Event.js"; // 실제 엔티티 파일 경로에 맞게 수정하세요
import { User } from "../entities/User.js"; // 실제 엔티티 파일 경로에 맞게 수정하세요

import dotenv from "dotenv";
import { RefreshToken } from "../entities/RefreshToken.js";
import { Team } from "../entities/Team.js";
import { TeamUser } from "../entities/TeamUser.js";
dotenv.config();

export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || "3306"),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: false,
  logging: true,
  entities: [Event, User, RefreshToken, Team, TeamUser], // 이거 하자 제발
  migrations: [],
  subscribers: [],
});
