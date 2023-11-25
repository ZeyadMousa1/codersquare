import crypto from 'crypto';

import { ExpressHandler, User } from '../Types';
import { SigInResponse, SignInRequest, SignUpRequest, SignUpResponse } from '../api';
import { jwtSign } from '../auth';
import { db } from '../datastore';
import { PasswordService } from '../passwordService';

export const signUpHandler: ExpressHandler<{}, SignUpRequest, SignUpResponse> = async (
  req,
  res
) => {
  const { email, firstName, lastName, userName, password } = req.body;

  if (!email || !firstName || !lastName || !userName || !password) {
    return res.status(400).send({ error: 'All fields are required' });
  }

  const existing = (await db.getUserByEmail(email)) || (await db.getUserByUserName(userName));
  if (existing) {
    return res.status(403).send({ error: 'User already exists' });
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

export const signInHandler: ExpressHandler<{}, SignInRequest, SigInResponse> = async (req, res) => {
  const { login, password } = req.body;

  if (!login || !password) {
    return res.status(400).send({ error: 'Email and password are required' });
  }

  const existing = (await db.getUserByEmail(login)) || (await db.getUserByUserName(login));

  const matchPassword = await PasswordService.comparePassword(password, existing!.password);

  if (!existing || !matchPassword) {
    return res.status(403).send({ error: 'Email or password is incorrect' });
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
