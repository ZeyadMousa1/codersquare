import multer from 'multer';
import { Request } from 'express';
import { createError } from './ApiError';
import { Status } from './httpStatusText';

class Multer {
    static dishStorage = multer.diskStorage({
        destination: function (req, file, cb) {
            console.log('file', file);
            cb(null, 'uploads');
        },
        filename: function (req, file, cb) {
            const ext = file.mimetype.split('/')[1];
            const fileName = `user-${Date.now()}.${ext}`;
            cb(null, fileName);
        },
    });

    static fileFilter = (
        req: Request,
        file: Express.Multer.File,
        cb: multer.FileFilterCallback
    ) => {
        const imageType = file.mimetype.split('/')[0];
        if (imageType === 'image') {
            return cb(null, true);
        } else {
            return cb(createError('File must be an image', 404, Status.FAIL));
        }
    };
}

export const upload = multer({
    storage: Multer.dishStorage,
    fileFilter: Multer.fileFilter,
});
