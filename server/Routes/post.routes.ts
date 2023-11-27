import exress from 'express';
import asyncHandler from 'express-async-handler';

import { createPostHandler, getPostHandler, listPostHandler } from '../handlers/postHandler';
import { authMiddelware } from '../Middelwares/authMiddelware';

export const postRouter = exress.Router();

postRouter
   .route('/')
   .get(asyncHandler(listPostHandler))
   .post(authMiddelware, asyncHandler(createPostHandler));

postRouter.route('/:id').get(authMiddelware, asyncHandler(getPostHandler));
