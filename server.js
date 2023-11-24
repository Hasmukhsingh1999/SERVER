import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import cors from 'cors';
import morgan from "morgan";
import helmet from "helmet";
import { errorHandler, notFound } from "./middleware/error.middleware.js";
import userRoute from './routes/user.routes.js'



dotenv.config();
const app = express();

// DB connection ->
connectDB()

// Middlewares ->
app.use(helmet());
app.use(morgan('combined'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// Routes ->
app.use('/api/user',userRoute)


// Error Handling ->
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server started at PORT : ${PORT}`);
});
