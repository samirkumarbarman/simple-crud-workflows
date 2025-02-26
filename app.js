import express from 'express';
import userRoutes from './routes/user.routes.js';
import connectDB from './config/db.js';
import cors from 'cors';

connectDB();

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/v1/users', userRoutes);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({message:"Something went wrong"});
});

export default app;