import express, { Application, ErrorRequestHandler, Request, RequestHandler, Response } from 'express'
import { db } from './datastore';
import { createPostHandler, listPostHandler } from './handlers/postHandler';

const app: Application = express();

app.use(express.json())


const requestHandlerMiddelware: RequestHandler = (req, res, next) => {
    console.log(req.method, req.path, '- body', req.body);
    next();
}

app.use(requestHandlerMiddelware);

app.get('/posts', listPostHandler)

app.post('/posts', createPostHandler)

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    console.error('Unacaught excexption:', err)
    res.status(500).send('Oops, an unexpected error occured, please try again')
}

app.use(errorHandler)

const PORT = 9000;

app.listen(PORT, () => console.log(`App listen on port ${PORT}`))