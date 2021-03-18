import {Request, Response, NextFunction} from "express";
import jwt from 'jsonwebtoken'
import {Users} from "../entity/Users";
import {getRepository} from "typeorm";
import {NotAuthorizedError} from "../errors/not-authorized-error";

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

export const currentUser = async (req: Request, res: Response, next: NextFunction) => {
    if (req.headers.authorization) {
        // token gets sent through headers and has to be extracted
        const token = req.headers.authorization.replace('Bearer ', '')
        const {id, email} = jwt.verify(token, process.env.JWT_KEY) as UserPayload
        const userRepository = getRepository(Users);
        const user = await userRepository
            .findOne(
                {
                    where: {
                        id,
                        email
                    }
                }
            );
        if (user) {
            req.currentUser = {id, email}
            next()
        } else {
            throw new NotAuthorizedError()
        }
    } else {
        throw new NotAuthorizedError()
    }
}

