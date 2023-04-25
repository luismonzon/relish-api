import express, { Application, NextFunction, Request, Response } from "express";
import compression from "compression";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import morgan from "morgan";
import photoRouter from "./routes/photos";
import createError, { HttpError } from "http-errors";
import dotenv from "dotenv";

const ExpressApp = (): Application => {
  dotenv.config();

  const app = express();
  app.use(compression());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(helmet());
  app.use(cookieParser());
  app.use(morgan("dev"));

  app.use("/photos", photoRouter);

  app.use(function (_: Request, __: Response, next: NextFunction): void {
    next(createError(401));
  });

  app.use(function (
    error: HttpError,
    _: Request,
    res: Response,
    __: NextFunction
  ): void {
    res.locals.mesage = error.message;

    res.status(500);
    res.send({
      type: "error",
      status: error.status,
      mesage: error.message,
      stack: error.stack,
    });
  });
  return app;
};

export default ExpressApp;
