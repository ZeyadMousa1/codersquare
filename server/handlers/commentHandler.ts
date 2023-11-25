import crypto from 'crypto';

import { Comment, ExpressHandler, Post } from '../Types';
import {
   CreateCommentRequest,
   CreateCommentRequestParams,
   CreateCommentResponse,
   DeleteCommentRequestParams,
   DeleteCommentResponse,
   GetAllPostCommentsRequest,
   GetAllPostCommentsRequestParams,
   GetAllPostCommentsResponse,
} from '../api';
import { db } from '../datastore';

export const createCommentHandler: ExpressHandler<
   CreateCommentRequestParams,
   CreateCommentRequest,
   CreateCommentResponse,
   {}
> = async (req, res) => {
   const { comment } = req.body;
   if (!comment) {
      return res.status(400).send({ error: 'Comment is required' });
   }

   const postId = req.params.id;
   if (!postId) {
      return res.status(400).send({ error: 'Post is required' });
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

export const getAllPostComments: ExpressHandler<
   GetAllPostCommentsRequestParams,
   GetAllPostCommentsRequest,
   GetAllPostCommentsResponse,
   {}
> = async (req, res) => {
   const postId = req.params.id;
   if (!postId) {
      return res.status(400).send({ error: 'post is required' });
   }
   const comments: Comment[] = await db.listComments(postId);
   return res.status(200).send({ count: comments.length, comments });
};

export const deleteComment: ExpressHandler<
   DeleteCommentRequestParams,
   {},
   DeleteCommentResponse,
   {}
> = async (req, res) => {
   const commentId = req.params.id;
   if (!commentId) {
      return res.status(400).send({ error: 'Comment is required' });
   }
   const commentDet = await db.getComment(commentId);
   if (commentDet?.userId === res.locals.userId) {
      await db.deleteComent(commentId);
      return res.status(200).send({ status: 'success' });
   }
   return res.status(200).send({ error: 'Owner comment only can delete this comment' });
};
