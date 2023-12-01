import exress from 'express';
import asyncHandler from 'express-async-handler';

import {
    createCommentHandler,
    deleteCommentHandler,
    getAllPostCommentsHandler,
} from '../handlers/commentHandler';
import { authMiddelware } from '../Middelwares/authMiddelware';
import { ManageRoles } from '../Middelwares/ManageRoles';
import { Roles } from '../utils/roles';

export const commentRouter = exress.Router();

commentRouter
    .route('/:id')
    .post(
        authMiddelware,
        ManageRoles.allowedTo(Roles.ADMIN, Roles.USER),
        asyncHandler(createCommentHandler)
    )
    .get(
        authMiddelware,
        ManageRoles.allowedTo(Roles.ADMIN, Roles.USER),
        asyncHandler(getAllPostCommentsHandler)
    )
    .delete(
        authMiddelware,
        ManageRoles.allowedTo(Roles.USER, Roles.ADMIN),
        asyncHandler(deleteCommentHandler)
    );
