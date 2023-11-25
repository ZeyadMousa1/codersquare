import { RequestHandler } from "express";

export const requestHandlerMiddelware: RequestHandler = (req, res, next) => {
    console.log(req.method, req.path, '- body', req.body);
    next()
}