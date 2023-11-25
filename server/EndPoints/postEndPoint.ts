import exress from 'express';
import asyncHandler from 'express-async-handler';

import { createPostHandler, getPostHandler, listPostHandler } from '../handlers/postHandler';
import { authMiddelware } from '../middelware/authMiddelware';

export const postEndPoint = exress.Router();

postEndPoint
   .route('/')
   .get(asyncHandler(listPostHandler))
   .post(authMiddelware, asyncHandler(createPostHandler));

postEndPoint.route('/:id').get(authMiddelware, asyncHandler(getPostHandler));
