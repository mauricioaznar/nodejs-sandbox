import express, {Request, Response} from 'express'

const postRoutes = express.Router()

postRoutes.post('/posts', (req: Request, res: Response) => {
    res.send('post posted')
})

export default postRoutes