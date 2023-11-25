import dotenv from 'dotenv';
import express, { Application } from 'express';

import { authEndPoint } from './EndPoints/authEndPoint';
import { commentEndPoint } from './EndPoints/commentEndPoint';
import { postEndPoint } from './EndPoints/postEndPoint';
import { userEndPoint } from './EndPoints/usersEndPoint';
import { initDB } from './datastore';
import { errorHandler } from './middelware/errorMiddelware';
import { requestHandlerMiddelware } from './middelware/loggerMiddelware';

(async () => {
  await initDB();

  dotenv.config();

  const app: Application = express();

  app.use(express.json());

  // logger
  app.use(requestHandlerMiddelware);

  // endPoints
  app.use('/v1/posts', postEndPoint);
  app.use('/v1/auth', authEndPoint);
  app.use('/v1/users', userEndPoint);
  app.use('/v1/comments', commentEndPoint);

  // handleError
  app.use(errorHandler);

  const PORT = 9000;

  app.listen(PORT, () => console.log(`App listen on port ${PORT}`));
})();
