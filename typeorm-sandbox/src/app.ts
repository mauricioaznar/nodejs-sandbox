import 'express-async-errors'
import express, {Request, Response} from "express";
import {json} from "body-parser";
import userRoutes from "./routes/user";
import {errorHandler} from "./middlewares/error-handler";
import {BadRequestError} from "./errors/bad-request-error";

const app = express()

app.use(json())

app.use('/users', userRoutes)

app.get('/', async (req: Request, res: Response) => {

    throw new BadRequestError('as')
})

app.use(errorHandler)

export default app