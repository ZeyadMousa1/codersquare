import express, { Application, Request, RequestHandler, Response } from 'express'
import { db } from './datastore';

const app: Application = express();

app.use(express.json())


const requestHandlerMiddelware: RequestHandler = (req, res, next) => {
    console.log(req.method, req.path, '- body', req.body);
    next();
}

app.use(requestHandlerMiddelware);

app.get('/posts', (req, res) => {
    res.send({ posts: db.listPosts() })
})

app.post('/posts', (req, res) => {
    const post = req.body;
    db.createPost(post)
    res.sendStatus(200);
})


const PORT = 9000;

app.listen(PORT, () => console.log(`App listen on port ${PORT}`))