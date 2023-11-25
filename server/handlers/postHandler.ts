import crypto from 'crypto';

import { ExpressHandler, Post } from '../Types';
import { CreatePostRequest, CreatePostResponse, ListPostResponse, ListPostsRequest } from '../api';
import { db } from '../datastore';

export const listPostHandler: ExpressHandler<{}, ListPostsRequest, ListPostResponse> = async (
  req,
  res
) => {
  console.log(req.headers.authorization);
  res.send({ posts: await db.listPosts() });
};

export const createPostHandler: ExpressHandler<{}, CreatePostRequest, CreatePostResponse> = async (
  req,
  res
) => {
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
