import express from 'express';
import asyncHandler from 'express-async-handler';

import { deleteLikeHandler, countLikes, likeHandler, listPostLikes } from '../handlers/likeHandler';
import { authMiddelware } from '../middelware/authMiddelware';
import { listPostHandler } from '../handlers/postHandler';

export const likeEndPoint = express.Router();

likeEndPoint
   .route('/:postId')
   .post(authMiddelware, asyncHandler(likeHandler))
   .delete(authMiddelware, asyncHandler(deleteLikeHandler))
   .get(authMiddelware, asyncHandler(countLikes));

likeEndPoint.route('/all/:postId').get(authMiddelware, asyncHandler(listPostLikes));
