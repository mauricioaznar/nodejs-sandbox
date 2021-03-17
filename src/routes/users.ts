import express, {Request, Response} from 'express'

const userRoutes = express.Router()

userRoutes.post(
    '/users',
    async (req: Request, res: Response) => {
        res.send('user created')
    }
)

export {userRoutes}