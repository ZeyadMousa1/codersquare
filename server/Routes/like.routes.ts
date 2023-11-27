import express from 'express';
import asyncHandler from 'express-async-handler';

import {
   deleteLikeHandler,
   countLikesHandler,
   likeHandler,
   listPostLikesHandler,
} from '../handlers/likeHandler';
import { authMiddelware } from '../Middelwares/authMiddelware';

export const likeRouter = express.Router();

likeRouter
   .route('/:postId')
   .post(authMiddelware, asyncHandler(likeHandler))
   .delete(authMiddelware, asyncHandler(deleteLikeHandler))
   .get(authMiddelware, asyncHandler(countLikesHandler));

likeRouter.route('/all/:postId').get(authMiddelware, asyncHandler(listPostLikesHandler));
