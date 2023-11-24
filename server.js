import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import cookieParser from "cookie-parser";
import { errorHandler, notFound } from './middleware/error.middleware.js';
import userRoute from './routes/user.routes.js';
import authRoute from './routes/auth.route.js';

dotenv.config();
const PORT = process.env.PORT || 4000;
const app = express();

// DB connection ->
connectDB();

// Middlewares ->
app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(cookieParser());

// Routes ->
app.use('/api/auth', authRoute);
app.use('/api/user', userRoute);

// Error Handling ->
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server started at PORT : ${PORT}`);
});
