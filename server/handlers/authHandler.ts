import crypto from 'crypto';

import { ExpressHandler, User } from '../Types';
import { SigInResponse, SignInRequest, SignUpRequest, SignUpResponse } from '../api';
import { jwtSign } from '../auth';
import { db } from '../datastore';
import { PasswordService } from '../passwordService';
import { createError } from '../utils/ApiError';
import { Status } from '../utils/httpStatusText';

export const signUpHandler: ExpressHandler<{}, SignUpRequest, SignUpResponse, {}> = async (
   req,
   res,
   next
) => {
   const { email, firstName, lastName, userName, password } = req.body;

   if (!email || !firstName || !lastName || !userName || !password) {
      return next(createError('All fields are required', 400, Status.FAIL));
   }

   const existing = (await db.getUserByEmail(email)) || (await db.getUserByUserName(userName));
   if (existing) {
      return next(createError('User already exists', 403, Status.FAIL));
   }

   const hashedPassword = await PasswordService.hashPassword(password);

   const user: User = {
      id: crypto.randomUUID(),
      email,
      firstName,
      lastName,
      userName,
      password: hashedPassword,
   };
   await db.createUser(user);
   const jwtToken = jwtSign({ userId: user.id });
   return res.status(200).send({
      jwtToken,
   });
};

export const signInHandler: ExpressHandler<{}, SignInRequest, SigInResponse, {}> = async (
   req,
   res,
   next
) => {
   const { login, password } = req.body;

   if (!login || !password) {
      return next(createError('Email and password are required', 400, Status.FAIL));
   }

   const existing = (await db.getUserByEmail(login)) || (await db.getUserByUserName(login));

   const matchPassword = await PasswordService.comparePassword(password, existing!.password);

   if (!existing || !matchPassword) {
      return next(createError('Email or password is incorrect', 400, Status.FAIL));
   }

   const jwtToken = jwtSign({ userId: existing.id });

   return res.status(200).send({
      user: {
         email: existing.email,
         firstName: existing.firstName,
         lastName: existing.lastName,
         userName: existing.userName,
         id: existing.id,
      },
      jwtToken,
   });
};
