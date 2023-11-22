import express, { Application } from 'express'
import { createPostHandler, listPostHandler } from './handlers/postHandler';
import asyncHandler from 'express-async-handler';
import { initDB } from './datastore';
import { signInHandler, signUpHandler } from './handlers/authHandler';
import { requestHandlerMiddelware } from './middelware/loggerMiddelware';
import { errorHandler } from './middelware/errorMiddelware';
import { getAllUsersHandler } from './handlers/userHandler';
import dotenv from 'dotenv'
import { authMiddelware } from './middelware/authMiddelware';

(async () => {

    await initDB();

    dotenv.config();

    const app: Application = express();

    app.use(express.json())

    // logger
    app.use(requestHandlerMiddelware);

    // posts EndPoints
    app.get('/v1/posts', asyncHandler(listPostHandler))
    app.post('/v1/posts', authMiddelware, asyncHandler(createPostHandler))
    // auth EndPoints
    app.post('/v1/signup', asyncHandler(signUpHandler))
    app.post('/v1/signin', asyncHandler(signInHandler))
    //users EndPoints
    app.get('/v1/users', authMiddelware, asyncHandler(getAllUsersHandler))

    // handleError
    app.use(errorHandler)


    const PORT = 9000;

    app.listen(PORT, () => console.log(`App listen on port ${PORT}`))
})()
