import exress from 'express';
import asyncHandler from 'express-async-handler';

import {
  createCommentHandler,
  deleteComment,
  getAllPostComments,
} from '../handlers/commentHandler';
import { authMiddelware } from '../middelware/authMiddelware';

export const commentEndPoint = exress.Router();

commentEndPoint
  .route('/:id')
  .post(authMiddelware, asyncHandler(createCommentHandler))
  .get(authMiddelware, asyncHandler(getAllPostComments))
  .delete(authMiddelware, asyncHandler(deleteComment));
