import exress from 'express';
import asyncHandler from 'express-async-handler';

import { getAllUsersHandler } from '../handlers/userHandler';
import { authMiddelware } from '../Middelwares/authMiddelware';
import { SearchByUserNameHandler } from '../handlers/searchHandler';

export const userRouter = exress.Router();

userRouter.route('/').get(authMiddelware, asyncHandler(getAllUsersHandler));

userRouter.get('/search', authMiddelware, asyncHandler(SearchByUserNameHandler));
