import { db } from "../datastore"
import { ExpressHandler, Post } from "../Types"
import crypto from 'crypto'

export const listPostHandler: ExpressHandler<{}, {}> = (req, res) => {
    res.send({ data: db.listPosts() })
}

type createPostRequest = Pick<Post, 'title' | 'url' | 'userId'>

interface createPostResponse { }

export const createPostHandler: ExpressHandler<createPostRequest, createPostResponse> = (req, res) => {
    if (!req.body.title || !req.body.url || !req.body.userId) {
        return res.sendStatus(400)
    }

    const post: Post = {
        id: crypto.randomUUID(),
        postedAt: Date.now(),
        title: req.body.title,
        url: req.body.url,
        userId: req.body.userId
    }

    db.createPost(post);
}