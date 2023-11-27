import { ExpressHandler } from '../utils/Types';
import { getAllUsersRequest, getAllUsersResponse } from '../utils/api';
import { db } from '../datastore';

export const getAllUsersHandler: ExpressHandler<
   {},
   getAllUsersRequest,
   getAllUsersResponse,
   {}
> = async (req, res) => {
   const users = await db.getAllUsers();
   res.status(200).send({
      users,
   });
};
