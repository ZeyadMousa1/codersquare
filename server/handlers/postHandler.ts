import { CreatePostRequest, CreatePostResponse, ListPostsRequest, ListPostResponse } from "../api"
import { db } from "../datastore"
import { ExpressHandler, Post } from "../Types"
import crypto from 'crypto'

export const listPostHandler: ExpressHandler<ListPostsRequest, ListPostResponse> = async (req, res) => {
    res.send({ posts: await db.listPosts() })
}

export const createPostHandler: ExpressHandler<CreatePostRequest, CreatePostResponse> = async (req, res) => {
    if (!req.body.title || !req.body.url || !req.body.userId) {
        return res.sendStatus(400)
    }

    // TODO: validate user exists
    // TODO: get userId from session
    // TODO: validate title and url are non-emoty

    const post: Post = {
        id: crypto.randomUUID(),
        postedAt: Date.now(),
        title: req.body.title,
        url: req.body.url,
        userId: req.body.userId
    }

    await db.createPost(post);
}