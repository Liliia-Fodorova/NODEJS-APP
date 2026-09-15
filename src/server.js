import  express from 'express';
import 'dotenv/config';
import cors from 'cors';
import { errors } from 'celebrate';
import { connectMongoDB } from './db/connectMongoDB.js';
import { logger } from './middlware/logger.js';
import { notFoundHandler } from './middlware/notFoundHandler.js';
import { errorHandler } from './middlware/errorHandler.js';
import studentsRoutes from './routes/studentsRoutes.js';

const app = express();
const PORT = process.env.PORT ?? 3000;


app.use(logger);
app.use(express.json());
app.use(cors());
app.use(studentsRoutes);
app.use(notFoundHandler);
app.use(errors());
app.use(errorHandler);

await connectMongoDB();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});








