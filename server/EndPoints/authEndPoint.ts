import exress from 'express';
import asyncHandler from 'express-async-handler';

import { signInHandler, signUpHandler } from '../handlers/authHandler';

export const authEndPoint = exress.Router();

authEndPoint.route('/signup').post(asyncHandler(signUpHandler));

authEndPoint.route('/signin').post(asyncHandler(signInHandler));
