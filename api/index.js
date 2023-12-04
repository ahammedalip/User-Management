import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import userRoutes from './routes/userRuotes.js'
import authRoutes from './routes/authRoute.js'
import adminRoutes from './routes/adminRoute.js'
import cookieParser from 'cookie-parser';
import morgan from 'morgan';

dotenv.config();

mongoose.connect(process.env.MONGO).then(() => {
    console.log('Connected to mongo db')
}).catch((err) => {
    console.log(err)
});

const app = express();

app.use(express.json());
app.use(cookieParser())
app.use(morgan('tiny'));

app.listen(3000, () => {
    console.log('Server listening on port 3000')
});

app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes)

app.use((err, req, res, next) =>{
    const StatusCode = err.StatusCode || 500;
    const message = err.message || 'Internal server error';
    return  res.status(StatusCode).json({
        success: false,
        message,
        StatusCode 
    })
})