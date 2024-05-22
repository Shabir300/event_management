import express from 'express';
import cors from 'cors';
import authRouter from './routes/authRouter.js';
import cookieParser from 'cookie-parser';
import userRouter from './routes/userRouter.js'

const app = express();

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Credentials', true);
    next();
})

// ALLOW CROSS-ORIGIN STUFF
app.use(cors({
    origin: 'http://localhost:3000',
}));

app.use(cookieParser())

app.use(express.json());

// ROUTES 
app.use('/api', authRouter);
app.use('/api', userRouter);

app.listen(9000, () => console.log('server is listening!'));