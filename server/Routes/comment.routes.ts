import exress from 'express';
import asyncHandler from 'express-async-handler';

import {
   createCommentHandler,
   deleteCommentHandler,
   getAllPostCommentsHandler,
} from '../handlers/commentHandler';
import { authMiddelware } from '../Middelwares/authMiddelware';

export const commentRouter = exress.Router();

commentRouter
   .route('/:id')
   .post(authMiddelware, asyncHandler(createCommentHandler))
   .get(authMiddelware, asyncHandler(getAllPostCommentsHandler))
   .delete(authMiddelware, asyncHandler(deleteCommentHandler));
