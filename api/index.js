import express from 'express';
import cors from 'cors';
import authRouter from './routes/authRouter.js';
import cookieParser from 'cookie-parser';
import userRouter from './routes/userRouter.js';
import multer from 'multer'; 
import categoryRouter from './routes/categoryRouter.js';
import eventRouter from './routes/eventRouter.js';
import ticketsRouter from './routes/ticketsRouter.js';
import path from 'path';

const app = express();

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Credentials', true);
    next();
});

// ALLOW CROSS-ORIGIN STUFF
app.use(cors({
    origin: 'http://localhost:3000',
}));

app.use(cookieParser());
app.use(express.json());

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../client/public/uploads')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname)
    }
});

const upload = multer({ storage: storage });

app.post('/api/upload', upload.single('file'), function (req, res) {
    const file = req.file;
    res.status(201).json(file.filename);
});

// const __dirname = path.resolve();

// app.use('/upload', express.static(path.join(__dirname, 'upload')));
// app.use('/static', express.static(path.join(__dirname, 'static')));


// ROUTES 
app.use('/api', authRouter);
app.use('/api', userRouter);
app.use('/api', categoryRouter);
app.use('/api', eventRouter);
app.use('/api', ticketsRouter)

app.listen(9000, () => console.log('server is listening!'));