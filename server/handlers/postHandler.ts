import crypto from 'crypto';

import { ExpressHandler, Like, Post } from '../Types';
import {
   CreatePostRequest,
   CreatePostResponse,
   GetPostRequestParams,
   GetPostResponse,
   ListPostResponse,
   ListPostsRequest,
} from '../api';
import { db } from '../datastore';

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
   };

   await db.createPost(post);

   res.sendStatus(200);
};

export const getPostHandler: ExpressHandler<
   GetPostRequestParams,
   {},
   GetPostResponse,
   { isLiked: boolean }
> = async (req, res) => {
   const id = req.params.id;
   const post = await db.getPost(id!);
   res.status(200).send({ post });
};
