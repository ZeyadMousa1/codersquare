import exress from 'express';
import asyncHandler from 'express-async-handler';

import { signInHandler, signUpHandler } from '../handlers/authHandler';
import { upload } from '../utils/multer';

export const authRouter = exress.Router();

authRouter.route('/signup').post(upload.single('avatar'), asyncHandler(signUpHandler));

authRouter.route('/signin').post(asyncHandler(signInHandler));
