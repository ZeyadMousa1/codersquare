import express, { Application, ErrorRequestHandler, Request, RequestHandler, Response } from 'express'
import { createPostHandler, listPostHandler } from './handlers/postHandler';
import asyncHandler from 'express-async-handler';
import { initDB } from './datastore';
import { getAllUsersHandler, signInHandler, signUpHandler } from './handlers/userHandler';

(async () => {

    await initDB();

    const app: Application = express();

    app.use(express.json())


    const requestHandlerMiddelware: RequestHandler = (req, res, next) => {
        console.log(req.method, req.path, '- body', req.body);
        next();
    }

    app.use(requestHandlerMiddelware);

    app.get('/v1/posts', asyncHandler(listPostHandler))
    app.post('/v1/posts', asyncHandler(createPostHandler))

    app.post('/v1/signup', asyncHandler(signUpHandler))
    app.post('/v1/signin', asyncHandler(signInHandler))
    app.get('/v1/users', asyncHandler(getAllUsersHandler))

    const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
        console.error('Unacaught excexption:', err)
        res.status(500).send('Oops, an unexpected error occured, please try again')
    }

    app.use(errorHandler)

    const PORT = 9000;

    app.listen(PORT, () => console.log(`App listen on port ${PORT}`))
})()
