import { NextFunction, Request, Response } from 'express';
import { createError } from '../utils/ApiError';
import { Status } from '../utils/httpStatusText';

export class ManageRoles {
    static allowedTo = (...roles: string[]) => {
        return (req: Request, res: Response, next: NextFunction) => {
            if (!roles.includes((req as any).currentUser.role)) {
                throw createError(`this role is not authorized`, 401, Status.FAIL);
            }
            next();
        };
    };
}
