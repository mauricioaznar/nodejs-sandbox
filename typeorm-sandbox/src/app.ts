import 'express-async-errors'
import express, {Request, Response} from "express";
import {json} from "body-parser";
import userRoutes from "./routes/user";
import {errorHandler} from "./middlewares/error-handler";
import {BadRequestError} from "./errors/bad-request-error";
import {getRepository, Like} from "typeorm";
import {Products} from "./entity/Products";

const app = express()

app.use(json())

app.use('/users', userRoutes)

app.get('/', async (req: Request, res: Response) => {


    const productsRepository = getRepository(Products)

    const [products, count] = await productsRepository.findAndCount({
        where: { description: Like('%bolsa%') },
        take: 5,
        skip: 200,
        order: { description: "DESC" }
    })


    res.send({products, count})
})

app.use(errorHandler)

export default app