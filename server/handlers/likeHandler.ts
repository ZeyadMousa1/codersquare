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
import { createError } from '../utils/ApiError';
import { Status } from '../utils/httpStatusText';

export const likeHandler: ExpressHandler<LikeRequestParams, {}, {}, {}> = async (
   req,
   res,
   next
) => {
   const postId = req.params.postId;
   if (!postId) {
      return next(createError('PostId is required', 400, Status.FAIL));
   }
   if (!(await db.getPost(postId))) {
      return next(createError('Post is required', 400, Status.FAIL));
   }
   let found = await db.exists({
      postId,
      userId: res.locals.userId,
   });
   if (found) {
      return next(createError('Duplicate like', 400, Status.FAIL));
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
   res,
   next
) => {
   const postId = req.params.postId;
   if (!postId) {
      return next(createError('PostId is required', 400, Status.FAIL));
   }

   if (!(await db.getPost(postId))) {
      return next(createError('Post is required', 400, Status.FAIL));
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
> = async (req, res, next) => {
   const postId = req.params.postId;
   if (!postId) {
      return next(createError('PostId is required', 400, Status.FAIL));
   }
   const count: number = await db.countLikes(postId);
   return res.status(200).send({ count });
};

export const listPostLikes: ExpressHandler<
   ListPostLikesRequestarams,
   ListPostLikesRequest,
   listPostLikesResponse,
   {}
> = async (req, res, next) => {
   const postId = req.params.postId;
   if (!postId) {
      return next(createError('PostId is required', 400, Status.FAIL));
   }
   const likes = await db.listPostLikes(postId);
   return res.status(200).send({ likes });
};
