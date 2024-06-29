import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import route from './routes/userRoute.js';


const app =express();


app.use(express.json());
app.use(cors({
    origin: ["https://crud-mern-app-kohl.vercel.app/"],
    methods: ["POST", "GET"],
    credentials: true
}));
dotenv.config();

const PORT = process.env.PORT || 8000;
// const databaseUrl = process.env.DATABASE_URL;
// console.log('Database URL:', databaseUrl);


app.use("/api", route);

const databaseUrl = process.env.DATABASE_URL;

mongoose.connect(databaseUrl, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Database connected successfully');
    })
    .catch((error) => {
        console.log('Database connection error:', error);
    });
app.listen(PORT, ()=>{
    console.log(`Server is running on port: ${PORT}`);
    });
   