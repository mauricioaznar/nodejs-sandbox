import {Response, Request, NextFunction} from "express";
import {NotAuthorizedError} from "../../../main-sandbox/src/errors/not-authorized-error";

export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
    if (!req.currentUser) {
        throw new NotAuthorizedError()
    }
    next()
}