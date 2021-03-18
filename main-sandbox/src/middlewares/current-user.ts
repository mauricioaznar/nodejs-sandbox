import {Request, Response, NextFunction} from "express";

interface UserPayload {
    id: string;
    email: string;
}

declare global {
    namespace Express {
        interface Request {
            currentUser?: UserPayload
        }
    }
}

export const currentUser = (req: Request, res: Response, next: NextFunction) => {
    try {
        if (req.headers.authorization) {
            const token = req.headers.authorization.replace('Bearer ', '')
            console.log(token)
        }
    } catch(e) {
        console.error(e)
    }
    next()
}

