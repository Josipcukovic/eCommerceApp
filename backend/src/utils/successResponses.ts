import { Response } from "express";
import { httpStatusCodes } from "../constants/appConstants";
import { SuccessData } from "../types";

class SuccessResponses {
  static okResponse(res: Response, data: SuccessData) {
    if (typeof data == "string") return res.status(httpStatusCodes.OK).json({ message: data });

    return res.status(httpStatusCodes.OK).json(data);
  }

  static creationSuccess(res: Response, data: SuccessData) {
    if (typeof data == "string") return res.status(httpStatusCodes.CREATED).json({ message: data });

    return res.status(httpStatusCodes.CREATED).json(data);
  }
}

export = SuccessResponses;
