import { ExpressHandler } from "../Types";
import { verifyJwt } from "../auth";
import { db } from "../datastore";

export const authMiddelware: ExpressHandler<any, any> = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]
    if (!token)
        return res.status(401).send({ error: 'token is required' })

    try {
        const payLoad = verifyJwt(token);
        const user = db.getUserById(payLoad.userId)
        if (!user)
            throw 'user not found'
        next();
    } catch {
        res.status(401).send({ error: 'Bad token' })
    }
}