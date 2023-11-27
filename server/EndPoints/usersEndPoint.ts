import exress from 'express';
import asyncHandler from 'express-async-handler';

import { getAllUsersHandler } from '../handlers/userHandler';
import { authMiddelware } from '../middelware/authMiddelware';
import { SearchByUserNameHandler } from '../handlers/searchHandler';

export const userEndPoint = exress.Router();

userEndPoint.route('/').get(authMiddelware, asyncHandler(getAllUsersHandler));

userEndPoint.get('/search', authMiddelware, asyncHandler(SearchByUserNameHandler));
