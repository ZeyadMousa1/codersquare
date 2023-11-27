import exress from 'express';
import asyncHandler from 'express-async-handler';

import { signInHandler, signUpHandler } from '../handlers/authHandler';

export const authRouter = exress.Router();

authRouter.route('/signup').post(asyncHandler(signUpHandler));

authRouter.route('/signin').post(asyncHandler(signInHandler));
