import exress from 'express';
import asyncHandler from 'express-async-handler';

import {
    createPostHandler,
    deletePostHandler,
    getPostHandler,
    listPostHandler,
} from '../handlers/postHandler';
import { authMiddelware } from '../Middelwares/authMiddelware';
import { ManageRoles } from '../Middelwares/ManageRoles';
import { Roles } from '../utils/roles';
import { upload } from '../utils/multer';

export const postRouter = exress.Router();

postRouter
    .route('/')
    .get(authMiddelware, asyncHandler(listPostHandler))
    .post(authMiddelware, upload.single('image'), asyncHandler(createPostHandler));

postRouter
    .route('/:id')
    .get(authMiddelware, asyncHandler(getPostHandler))
    .delete(
        authMiddelware,
        ManageRoles.allowedTo(Roles.USER, Roles.ADMIN),
        asyncHandler(deletePostHandler)
    );
