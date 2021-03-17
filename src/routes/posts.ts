import express, {Request, Response} from 'express'
import {Post} from "../models/post";

const postRoutes = express.Router()

postRoutes.post('/posts', async (req: Request, res: Response) => {
    const post = Post.build({name: 'Post 1'})
    await post.save()
    res.send(post)
})

postRoutes.get('/posts/:id', async (req: Request, res: Response) => {
    const params = req.params
    const post = await Post.findOne()

    if (!post) {
        throw new Error('Post not found')
    }

    const result = await post.hasName('a name')

    res.send(params)
})

postRoutes.get('/posts', async (req: Request, res: Response) => {
    const posts = await Post.find()
    res.send(posts)
})

export {postRoutes}