import express, { Application, Request, RequestHandler, Response } from 'express'
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


const PORT = 9000;

app.listen(PORT, () => console.log(`App listen on port ${PORT}`))