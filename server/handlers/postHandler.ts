import crypto from 'crypto';

import { ExpressHandler, Like, Post } from '../utils/Types';
import {
    CreatePostRequest,
    CreatePostResponse,
    DeleteCommentRequestParams,
    DeletePostResponse,
    GetPostRequestParams,
    GetPostResponse,
    ListPostResponse,
    ListPostsRequest,
} from '../utils/api';
import { db } from '../datastore';
import { createError } from '../utils/ApiError';
import { Status } from '../utils/httpStatusText';

export const listPostHandler: ExpressHandler<{}, ListPostsRequest, ListPostResponse, {}> = async (
    req,
    res
) => {
    console.log(req.headers.authorization);
    res.send({ posts: await db.listPosts() });
};

export const createPostHandler: ExpressHandler<
    {},
    CreatePostRequest,
    CreatePostResponse,
    {}
> = async (req, res) => {
    if (!req.body.title || !req.body.url) {
        return res.sendStatus(400);
    }

    const post: Post = {
        id: crypto.randomUUID(),
        postedAt: Date.now(),
        title: req.body.title,
        url: req.body.url,
        userId: res.locals.userId,
        image: req.file?.filename ?? undefined,
    };

    await db.createPost(post);

    res.sendStatus(200);
};

export const getPostHandler: ExpressHandler<GetPostRequestParams, {}, GetPostResponse, {}> = async (
    req,
    res,
    next
) => {
    const id = req.params.id;
    if (!id) {
        return next(createError(`no posts with this id ${id}`, 400, Status.FAIL));
    }
    const post = await db.getPost(id!);
    res.status(200).send({ post });
};

export const deletePostHandler: ExpressHandler<
    DeleteCommentRequestParams,
    {},
    DeletePostResponse,
    {}
> = async (req, res, next) => {
    const { id } = req.params;
    if (!id) {
        return next(createError(`no posts with this id ${id}`, 400, Status.FAIL));
    }
    const post = await db.getPost(id);
    const isAdmin = res.locals.userRoles.includes('admin');
    if (post?.userId === res.locals.userId || isAdmin) {
        await db.deletePost(id);
        return res.status(200).send({ status: Status.SUCCESS });
    }
    return next(createError('Owner post only can delete this post', 400, Status.FAIL));
};
