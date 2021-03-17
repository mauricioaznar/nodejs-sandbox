import express, {Request, Response} from 'express'
import {json} from "body-parser";

const app = express()

app.use(json())

app.get('/', (req: Request, res: Response) => {
    res.send('Hello world!')
})

const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log('Listening on port 3000')
})

