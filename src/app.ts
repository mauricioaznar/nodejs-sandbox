import express, {Request, Response} from "express";
import {json} from "body-parser";
import {postRoutes} from "./routes/posts";
import {userRoutes} from "./routes/users";
import {errorHandler} from "./middlewares/error-handler";
import {currentUser} from "./middlewares/current-user";

const app = express()

app.use(json())

app.use(currentUser)

app.use(postRoutes)
app.use(userRoutes)

app.get('/', (req: Request, res: Response) => {
    res.send('Hello world!')
})

app.use(errorHandler)

export default app