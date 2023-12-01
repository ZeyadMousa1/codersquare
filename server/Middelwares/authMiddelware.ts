import { ExpressHandler } from '../utils/Types';
import { verifyJwt } from '../utils/auth';
import { db } from '../datastore';

export const authMiddelware: ExpressHandler<any, any, any, any> = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).send({ error: 'token is required' });

    try {
        const payLoad = verifyJwt(token);
        const currentUser = await db.getUserById(payLoad.userId);
        if (!currentUser) {
            throw 'user not found';
        }
        (req as any).currentUser = currentUser;
        res.locals.userId = currentUser.id;
        res.locals.userRoles = currentUser.role;
        next();
    } catch {
        res.status(401).send({ error: 'Bad token' });
    }
};
