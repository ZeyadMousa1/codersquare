import crypto from 'crypto';

import { Comment, ExpressHandler, Post } from '../utils/Types';
import {
   CreateCommentRequest,
   CreateCommentRequestParams,
   CreateCommentResponse,
   DeleteCommentRequestParams,
   DeleteCommentResponse,
   GetAllPostCommentsRequest,
   GetAllPostCommentsRequestParams,
   GetAllPostCommentsResponse,
} from '../utils/api';
import { db } from '../datastore';
import { createError } from '../utils/ApiError';
import { Status } from '../utils/httpStatusText';

export const createCommentHandler: ExpressHandler<
   CreateCommentRequestParams,
   CreateCommentRequest,
   CreateCommentResponse,
   {}
> = async (req, res, next) => {
   const { comment } = req.body;
   if (!comment) {
      return next(createError('Comment is required', 400, Status.FAIL));
   }

   const postId = req.params.id;
   if (!postId) {
      return next(createError('PostId is required', 400, Status.FAIL));
   }

   const newComment: Comment = {
      id: crypto.randomUUID(),
      postedAt: Date.now(),
      userId: res.locals.userId,
      postId,
      comment,
   };

   await db.createComment(newComment);
   res.status(200).send({ status: 'success' });
};

export const getAllPostCommentsHandler: ExpressHandler<
   GetAllPostCommentsRequestParams,
   GetAllPostCommentsRequest,
   GetAllPostCommentsResponse,
   {}
> = async (req, res, next) => {
   const postId = req.params.id;
   if (!postId) {
      return next(createError('PostId is required', 400, Status.FAIL));
   }
   const comments: Comment[] = await db.listComments(postId);
   return res.status(200).send({ count: comments.length, comments });
};

export const deleteCommentHandler: ExpressHandler<
   DeleteCommentRequestParams,
   {},
   DeleteCommentResponse,
   {}
> = async (req, res, next) => {
   const commentId = req.params.id;
   if (!commentId) {
      return next(createError('CommentId is required', 400, Status.FAIL));
   }
   const comment = await db.getComment(commentId);
   if (comment?.userId === res.locals.userId) {
      await db.deleteComent(commentId);
      return res.status(200).send({ status: 'success' });
   }
   return next(createError('Owner comment only can delete this comment', 400, Status.FAIL));
};
