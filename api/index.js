import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import userRoutes from './routes/userRuotes.js'

dotenv.config();

mongoose.connect(process.env.MONGO).then(() => {
    console.log('Connected to mongo db')
}).catch((err) => {
    console.log(err)
});

const app = express();

app.listen(3000, () => {
    console.log('Server listening on port 3000')
});

app.use('/api/user', userRoutes);