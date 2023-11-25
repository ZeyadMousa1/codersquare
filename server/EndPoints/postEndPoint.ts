import exress from 'express';
import asyncHandler from 'express-async-handler';

import { createPostHandler, listPostHandler } from '../handlers/postHandler';
import { authMiddelware } from '../middelware/authMiddelware';

export const postEndPoint = exress.Router();

postEndPoint
  .route('/')
  .get(asyncHandler(listPostHandler))
  .post(authMiddelware, asyncHandler(createPostHandler));
