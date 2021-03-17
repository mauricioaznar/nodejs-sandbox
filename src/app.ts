import express, {Request, Response} from "express";
import {json} from "body-parser";
import postRoutes from "./routes/newPost";

const app = express()

app.use(json())
app.use(postRoutes)

app.get('/', (req: Request, res: Response) => {
    res.send('Hello world!')
})

export default app