import { ExpressHandler, User } from '../utils/Types';
import {
    GetAllUsersRequest,
    GetAllUsersResponse,
    GetUserRequestParams,
    GetUserResonse,
    UpdateUserRequest,
    UpdateUserResonse,
} from '../utils/api';
import { db } from '../datastore';
import { createError } from '../utils/ApiError';
import { Status } from '../utils/httpStatusText';

export const getAllUsersHandler: ExpressHandler<
    {},
    GetAllUsersRequest,
    GetAllUsersResponse,
    {}
> = async (req, res) => {
    const users = await db.getAllUsers();
    res.status(200).send({
        users,
    });
};

export const getUserHandler: ExpressHandler<GetUserRequestParams, {}, GetUserResonse, {}> = async (
    req,
    res,
    next
) => {
    const { find } = req.params;
    const user =
        (await db.getUserById(find!)) ||
        (await db.getUserByEmail(find!)) ||
        (await db.getUserByUserName(find!));
    if (!user) {
        return next(createError(`There is no user`, 400, Status.FAIL));
    }
    res.status(200).send({ user });
};

export const updateUser: ExpressHandler<{}, UpdateUserRequest, UpdateUserResonse, {}> = async (
    req,
    res,
    next
) => {
    const currentUserId = res.locals.userId;
    const currentUser = await db.getUserById(currentUserId);
    if (!currentUser) {
        return next(createError('this user is not available', 400, Status.FAIL));
    }
    const { firstName, lastName, userName, avatar } = req.body;

    await db.updateCurrentUser({
        id: currentUserId,
        firstName: firstName ?? currentUser?.firstName!,
        lastName: lastName ?? currentUser?.lastName!,
        userName: userName ?? currentUser?.userName!,
        email: currentUser?.email!,
        password: currentUser?.password!,
        role: currentUser?.role,
        avatar: avatar ?? currentUser.avatar,
    });

    return res.status(200).send({ status: 'success' });
};
