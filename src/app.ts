import express, {Request, Response} from "express";
import {json} from "body-parser";

const app = express()

app.use(json())

app.get('/', (req: Request, res: Response) => {
    res.send('Hello world!')
})

export default app