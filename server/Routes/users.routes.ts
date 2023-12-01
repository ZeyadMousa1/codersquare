import exress from 'express';
import asyncHandler from 'express-async-handler';

import { getAllUsersHandler, getUserHandler, updateUser } from '../handlers/userHandler';
import { authMiddelware } from '../Middelwares/authMiddelware';
import { SearchByUserNameHandler } from '../handlers/searchHandler';
import { ManageRoles } from '../Middelwares/ManageRoles';
import { Roles } from '../utils/roles';

export const userRouter = exress.Router();

userRouter
    .route('/')
    .get(authMiddelware, ManageRoles.allowedTo(Roles.ADMIN), asyncHandler(getAllUsersHandler))
    .put(authMiddelware, ManageRoles.allowedTo(Roles.ADMIN, Roles.USER), asyncHandler(updateUser));

userRouter
    .route('/:find')
    .get(ManageRoles.allowedTo(Roles.ADMIN, Roles.USER), asyncHandler(getUserHandler));

userRouter.get(
    '/search',
    authMiddelware,
    ManageRoles.allowedTo(Roles.USER, Roles.ADMIN),
    asyncHandler(SearchByUserNameHandler)
);
