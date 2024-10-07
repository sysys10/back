import express, { CookieOptions, Request,Express, NextFunction, RequestHandler ,Response} from "express";
import cookieParser from "cookie-parser";
import authRouter from "./routes/authRoutes.js";
import eventRoutes from './routes/eventRoutes.js';
import teamRoutes from './routes/teamRoutes.js';
import { AppDataSource } from "./config/typeorm.config.js";
import cors from "cors";
import * as dotenv from 'dotenv';
import { JwtPayload } from "jsonwebtoken";
// import { errorHandler, notFoundHandler } from "./middleware/errorHandler.js";

dotenv.config();
const app: Express = express();
const PORT = process.env.PORT;

app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:8080"],
    credentials: true, //이건 프론트랑 맞춰야함(쿠키를 쓸거라는 뜻)
  })
);
//app.use(
//  cors({
//   origin: ["http://localhost:5173","http://localhost:8080"], //일단 여기만
//    credentials: true, 
//  })
//);
// 바디 파서
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
declare global {
  namespace Express {
    interface Request {
      user: JwtPayload;
    }
  }

}

const cookieDiagnostics :RequestHandler = (req: Request, res: Response, next: NextFunction) => {
 
  console.log('Request URL:', req.url);
  console.log('Request Method:', req.method);
  
  // 파싱된 쿠키 출력
  console.log('Parsed Cookies:', req.cookies);
  next();
};

// Express 앱에 미들웨어 적용
app.use(cookieDiagnostics);


AppDataSource.initialize()
  .then(() => console.log("typeorm 연결됨"))
  .catch((err:any) => console.log("typeorm 연결안됨 ", err));
app.use((req, res, next) => {
  console.log(`Received ${req.method} request to ${req.url}`);
  next();
});

// app.use(notFoundHandler);
// app.use(errorHandler);

app.use("/api/user", authRouter);
app.use('/api/event', eventRoutes);
app.use('/api/team', teamRoutes);

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT} 에 서버가 열렸습니다.`);
});
