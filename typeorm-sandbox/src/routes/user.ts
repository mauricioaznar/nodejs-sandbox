import express, {Request, Response} from "express";
import bcrypt from 'bcrypt'
import {body} from "express-validator";
import jwt from 'jsonwebtoken'
import {getRepository} from "typeorm";

import {Users} from "../entity/Users";
import {validateRequest} from "../middlewares/validate-request";
import {BadRequestError} from "../errors/bad-request-error";
import {currentUser} from "../middlewares/current-user";
import {errorHandler} from "../middlewares/error-handler";

const userRoutes = express.Router()

userRoutes.post(
    '/signIn',
    [
      body('password')
          .not()
          .isEmpty()
          .isLength({min: 5})
          .withMessage('Password is required and must be minumum 5 characters'),
      body('email')
          .not()
          .isEmpty()
          .isEmail()
          .withMessage('Email is required and must be a valid email'),
    ],
    validateRequest,
    async (req: Request, res: Response) => {
        const {email, password} = req.body
        const userRepository = getRepository(Users);
        const user = await userRepository
            .findOne({
                where: {
                    email
                }
            });
        if (!user) {
            throw new BadRequestError('Invalid credentials')
            return
        }
        let storedPassword = user.password
        if (user.password.match(/^\$2y(.+)$/i)) {
            storedPassword = user.password
                .replace(/^\$2y(.+)$/i, '$2a$1');
        }
        const hashedPassword = await bcrypt.compare(password, storedPassword)
        if (!hashedPassword) {
            throw new BadRequestError('Invalid credentials')
        }
        const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_KEY)
        res.send({token})
    }
)

userRoutes.post(
    '/changePassword',
    currentUser,
    [
        body('password')
            .not()
            .isEmpty()
            .isLength({min: 5})
            .withMessage('Password is required and must be minumum 5 characters')
    ],
    validateRequest,
    async (req: Request, res: Response) => {
        const newPassword = await bcrypt.hash(req.body.password, 8)
        const {id, email} = req.currentUser
        const userRepository = getRepository(Users); // you can also get it via getConnection().getRepository() or getManager().getRepository()
        const user = await userRepository.findOne({
            where: {
                id
            }
        });
        user.password = newPassword;
        await userRepository.save(user);
        res.send(newPassword)
    }
)

userRoutes.use(errorHandler)

export default userRoutes