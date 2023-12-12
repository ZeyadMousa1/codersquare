import { ErrorRequestHandler, RequestHandler } from 'express';
import { ApiError } from '../utils/ApiError';
import { Status } from '../utils/httpStatusText';

export const notFound: RequestHandler = (req, res, next) => {
    res.status(400).send({
        message: 'Route Noy Found',
    });
};

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    if (err instanceof ApiError) {
        return res.status(err.statusCode).send({
            status: err.statusText,
            message: err.message,
        });
    } else {
        return res.status(500).json({
            status: Status.ERROR,
            msg: 'Something went wrong, please try again',
            err: err,
        });
    }
};
