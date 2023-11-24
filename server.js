import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import cors from 'cors';
import morgan from "morgan";
import helmet from "helmet";


dotenv.config();
const app = express();


connectDB()


app.use(helmet());
app.use(morgan('combined'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// Routes ->



// Error Handling ->


const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server started at PORT : ${PORT}`);
});
