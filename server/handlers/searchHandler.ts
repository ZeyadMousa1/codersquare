import { ExpressHandler } from '../utils/Types';
import { SearchByUserNameRequestQuery, SearchByUserNameResponse } from '../utils/api';
import { db } from '../datastore';
import { createError } from '../utils/ApiError';
import { Status } from '../utils/httpStatusText';

export const SearchByUserNameHandler: ExpressHandler<
   {},
   {},
   SearchByUserNameResponse,
   SearchByUserNameRequestQuery
> = async (req, res, next) => {
   const userName = req.query.userName;
   if (!userName) {
      return next(createError('Username is required to search complete', 400, Status.FAIL));
   }
   const users = await db.searchByUserName(userName);
   return res.status(200).send({ users });
};
