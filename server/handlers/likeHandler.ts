import { ExpressHandler, Like } from '../Types';
import {
   CountLikesRequest,
   CountLikesRequestParams,
   CountLikesResponse,
   LikeRequestParams,
   ListPostLikesRequestarams,
} from '../api';
import { db } from '../datastore';
import { ListPostLikesRequest, listPostLikesResponse } from '../api';

export const likeHandler: ExpressHandler<LikeRequestParams, {}, {}, {}> = async (req, res) => {
   const postId = req.params.postId;
   if (!postId) {
      return res.status(400).send({ error: 'Post id is required' });
   }
   if (!(await db.getPost(postId))) {
      return res.status(404).send({ error: 'Post not found' });
   }
   let found = await db.exists({
      postId,
      userId: res.locals.userId,
   });
   if (found) {
      return res.status(400).send({ error: 'Duplicate like' });
   }
   const addLike: Like = {
      postId,
      userId: res.locals.userId,
   };
   await db.createLike(addLike);
   return res.sendStatus(200);
};

export const deleteLikeHandler: ExpressHandler<LikeRequestParams, {}, {}, {}> = async (
   req,
   res
) => {
   const postId = req.params.postId;
   if (!postId) {
      return res.status(400).send({ error: 'Post id is required' });
   }

   if (!(await db.getPost(postId))) {
      return res.status(404).send({ error: 'Post not found' });
   }

   const deleteLike: Like = {
      postId,
      userId: res.locals.userId,
   };

   await db.deleteLike(deleteLike);
   return res.sendStatus(200);
};

export const countLikes: ExpressHandler<
   CountLikesRequestParams,
   CountLikesRequest,
   CountLikesResponse,
   {}
> = async (req, res) => {
   const postId = req.params.postId;
   if (!postId) {
      return res.status(400).send({ error: 'Post id is required' });
   }
   const count: number = await db.countLikes(postId);
   return res.status(200).send({ count });
};

export const listPostLikes: ExpressHandler<
   ListPostLikesRequestarams,
   ListPostLikesRequest,
   listPostLikesResponse,
   {}
> = async (req, res) => {
   const postId = req.params.postId;
   if (!postId) {
      return res.status(400).send({ error: 'Post id is required' });
   }
   const likes = await db.listPostLikes(postId);
   return res.status(200).send({ likes });
};
