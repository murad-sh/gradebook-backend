import express, { Application } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';

import { corsOptions } from './config/cors-options';
import router from './routes/index';
import { errorHandler, notFound } from './middlewares/error-handlers';

dotenv.config();
const port = process.env.PORT || 8080;
const app: Application = express();

app.use(helmet());
app.use(cors(corsOptions));
app.use(express.json());

app.use('/api', router);
app.use(notFound);
app.use(errorHandler);

app.listen('8080', () => {
  console.log(`Server running on port ${port}`);
});
