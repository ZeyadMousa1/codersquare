import express from 'express';
import asyncHandler from 'express-async-handler';

import { deleteLikeHandler, getPostLikes, likeHandler } from '../handlers/likeHandler';
import { authMiddelware } from '../middelware/authMiddelware';

export const likeEndPoint = express.Router();

likeEndPoint
   .route('/:postId')
   .post(authMiddelware, asyncHandler(likeHandler))
   .delete(authMiddelware, asyncHandler(deleteLikeHandler))
   .get(authMiddelware, asyncHandler(getPostLikes));
