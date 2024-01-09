import express from 'express';
import { configDotenv } from 'dotenv';

configDotenv();
const app = express();

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
