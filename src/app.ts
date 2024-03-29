import express, { Application } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';

import { corsOptions } from './config/cors-options';
import router from './routes/index';
import { errorHandler, notFoundHandler } from './middlewares/error-handlers';

dotenv.config();
const port = process.env.PORT || 8080;
const app: Application = express();

app.use(helmet());
app.use(cors(corsOptions));
app.use(express.json());

app.use('/api', router);
app.use(notFoundHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
