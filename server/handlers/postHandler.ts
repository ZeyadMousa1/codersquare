import { CreatePostRequest, CreatePostResponse, ListPostsRequest, ListPostResponse } from "../api"
import { db } from "../datastore"
import { ExpressHandler, Post } from "../Types"
import crypto from 'crypto'

export const listPostHandler: ExpressHandler<ListPostsRequest, ListPostResponse> = async (req, res) => {
    console.log(req.headers.authorization)
    res.send({ posts: await db.listPosts() })
}

export const createPostHandler: ExpressHandler<CreatePostRequest, CreatePostResponse> = async (req, res) => {
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

    await db.createPost(post);

    res.sendStatus(200);
}