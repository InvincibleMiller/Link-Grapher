import { Response } from "express";

type CustomError = {
  message: string;
  code: number;
};

const defineCustomError =
  (code: number) =>
  (message: string, res: Response): CustomError => {
    const error: CustomError = { message, code };
    res.status(code).json(error);
    return error;
  };

export const InvalidRequest = defineCustomError(403);
export const ServerError = defineCustomError(500);
