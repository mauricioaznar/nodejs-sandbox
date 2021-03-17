import express, {Request, Response} from 'express'

const userRoutes = express.Router()

userRoutes.post(
    '/users/signIn',
    async (req: Request, res: Response) => {
        res.send({token: 'token random'})
    }
)

export {userRoutes}