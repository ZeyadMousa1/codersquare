import { ExpressHandler, User } from '../Types';
import { SignInRequest, SignUpRequest, SignUpResponse, SigInResponse, getAllUsersRequest, getAllUsersResponse } from '../api';
import { db } from '../datastore';
import crypto from 'crypto'

export const signUpHandler: ExpressHandler<SignUpRequest, SignUpResponse> = async (req, res) => {
    const { email, firstName, lastName, userName, password } = req.body

    if (!email || !firstName || !lastName || !userName || !password) {
        return res.status(400).send('All fields are required');
    }

    const existing = await db.getUserByEmail(email) || await db.getUserByUserName(userName);
    if (existing) {
        return res.status(403).send('User already exists')
    }

    const user: User = {
        id: crypto.randomUUID(),
        email,
        firstName,
        lastName,
        userName,
        password
    }

    await db.createUser(user)
    return res.sendStatus(200);
}

export const signInHandler: ExpressHandler<SignInRequest, SigInResponse> = async (req, res) => {
    const { login, password } = req.body

    if (!login || !password) {
        return res.sendStatus(400)
    }

    const existing = await db.getUserByEmail(login) || await db.getUserByUserName(login);

    if (!existing || existing.password !== password) {
        return res.sendStatus(403)
    }

    return res.status(200).send({
        email: existing.email,
        firstName: existing.firstName,
        lastName: existing.lastName,
        userName: existing.userName,
        id: existing.id
    })
}

export const getAllUsersHandler: ExpressHandler<getAllUsersRequest, getAllUsersResponse> = async (req, res) => {
    const users = await db.getAllUsers();
    res.status(200).send({
        users
    })
}