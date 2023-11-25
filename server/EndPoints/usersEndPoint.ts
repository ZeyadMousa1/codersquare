import exress from 'express';
import asyncHandler from 'express-async-handler';

import { getAllUsersHandler } from '../handlers/userHandler';
import { authMiddelware } from '../middelware/authMiddelware';

export const userEndPoint = exress.Router();

userEndPoint.route('/').get(authMiddelware, asyncHandler(getAllUsersHandler));
