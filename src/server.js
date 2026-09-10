import  express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { connectMongoDB } from './db/connectMongoDB.js';
import { logger } from './middlware/logger.js';
import { notFoundHandler } from './middlware/notFoundHandler.js';
import { errorHandler } from './middlware/errorHandler.js';
import studentsRoutes from './routes/studentsRoutes.js';

const app = express();
const PORT = process.env.PORT ?? 3000;


app.use(logger);
app.use(express.json({type:['application/json', 'aplication/vnd.api+json'],
limit: '100kb',
}));
app.use(cors());
app.use(studentsRoutes);


// app.use((req, res, next) => {
//   console.log(`Time: ${new Date().toLocaleString()}`);
//   next();
// });

// app.get('/', (req, res) => {
//   res.status(200).json({message: 'Hello, World!'});
// });

// app.get('/test-error', (req, res) => {
//   throw new Error('Something went wrong');
// });

// app.post('/users', (req, res) => {
//   console.log(req.body);
//   res.status(201).json({message:'User created'});
// });


// app.use((req, res) => {
//   res.status(404).json({ message: 'Route not found' });
// });


// app.use((err, req, res, next) => {
//   console.error(err);

// const isProd = process.env.NODE_ENV === "production";

//   res.status(500).json({
//     message: isProd
//     ? "Something went wrong. Please try again later."
//     : err.message,
//   });
// })

app.use(notFoundHandler);
app.use(errorHandler);

await connectMongoDB();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});




