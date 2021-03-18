import express, {Request, Response} from 'express'
import {Post} from "../models/post";
import {body, param} from "express-validator";
import {validateRequest} from "../middlewares/validate-request";

const postRoutes = express.Router()

postRoutes.post(
    '/posts',
    [
        body('name')
            .not()
            .isEmpty()
            .isLength({min: 5})
            .withMessage('Name is required and must be minumum 5 characters'),
    ],
    validateRequest,
    async (req: Request, res: Response) => {

        const post = Post.build({name: 'Post 1'})
        await post.save()
        return res.send(post)

    }
)

postRoutes.get(
    '/posts/:id',
    [
        param('id')
            .isMongoId()
            .withMessage('id is not a mongo id')
    ],
    validateRequest,
    async (req: Request, res: Response) => {
        const params = req.params
        const post = await Post.findOne()

        if (!post) {
            throw new Error('Post not found')
        }

        // const result = await post.hasName('a name')

        res.send(params)
    }
)

postRoutes.get('/posts', async (req: Request, res: Response) => {
    const posts = await Post.find()
    res.send(posts)
})

export {postRoutes}