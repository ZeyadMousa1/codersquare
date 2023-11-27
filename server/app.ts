import dotenv from 'dotenv';
import express, { Application } from 'express';

import { authRouter } from './Routes/auth.routes';
import { commentRouter } from './Routes/comment.routes';
import { likeRouter } from './Routes/like.routes';
import { postRouter } from './Routes/post.routes';
import { userRouter } from './Routes/users.routes';
import { initDB } from './datastore';
import { errorHandler, notFound } from './Middelwares/errorMiddelware';
import { requestHandlerMiddelware } from './Middelwares/loggerMiddelware';

(async () => {
   await initDB();

   dotenv.config();

   const app: Application = express();

   app.use(express.json());

   // logger
   app.use(requestHandlerMiddelware);

   // endPoints
   app.use('/v1/posts', postRouter);
   app.use('/v1/auth', authRouter);
   app.use('/v1/users', userRouter);
   app.use('/v1/comments', commentRouter);
   app.use('/v1/likes', likeRouter);

   // handleError
   app.use(notFound);
   app.use(errorHandler);

   const PORT = 9000;

   app.listen(PORT, () => console.log(`App listen on port ${PORT}`));
})();
