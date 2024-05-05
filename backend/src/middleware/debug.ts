import type { Request, Response, NextFunction } from "express";
import dayjs from "dayjs";

export const logTime = (req: Request, res: Response, next: NextFunction) => {
  const timeStamp = dayjs().format("YYYY-MM-DDTHH:mm:ssZ[Z]");

  console.log(`@ ${timeStamp} [${req.method.toUpperCase()}] ${req.route.path}`);

  next();
};
