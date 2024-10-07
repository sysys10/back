// import { Request, Response, NextFunction } from 'express';
// import { ValidationError } from 'class-validator/types/validation/ValidationError';
// import { QueryFailedError } from 'typeorm';

// export class AppError extends Error {
//   constructor(public statusCode: number, message: string) {
//     super(message);
//     this.name = 'AppError';
//     Error.captureStackTrace(this, this.constructor);
//   }
// }

// interface ErrorResponse {
//   message: string;
//   statusCode: number;
//   stack?: string;
//   errors?: any;
// }

// export const errorHandler = (
//   err: unknown,
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   let errorResponse: ErrorResponse = {
//     message: 'Something went wrong',
//     statusCode: 500
//   };

//   if (err instanceof AppError) {
//     errorResponse.message = err.message;
//     errorResponse.statusCode = err.statusCode;
//   } else if (err instanceof ValidationError) {
//     errorResponse.message = 'Validation Error';
//     errorResponse.statusCode = 400;
//     errorResponse.errors = err.constraints;
//   } else if (err instanceof QueryFailedError) {
//     errorResponse.message = 'Database Error';
//     errorResponse.statusCode = 500;
//   } else if (err instanceof Error) {
//     errorResponse.message = err.message;
//   }

//   if (process.env.NODE_ENV === 'development' && err instanceof Error) {
//     errorResponse.stack = err.stack;
//   }

//   console.error(`[${new Date().toISOString()}] Error:`, err);

//   res.status(errorResponse.statusCode).json(errorResponse);
// };

// export const notFoundHandler = (req: Request, res: Response, next: NextFunction) => {
//   const error = new AppError(404, `Not Found - ${req.originalUrl}`);
//   next(error);
// };

// export const asyncHandler = (fn: Function) => (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   Promise.resolve(fn(req, res, next)).catch((error: unknown) => {
//     // 여기서 error를 AppError로 변환하거나 그대로 전달
//     if (error instanceof Error) {
//       next(new AppError(500, error.message));
//     } else {
//       next(new AppError(500, 'An unknown error occurred'));
//     }
//   });
// };