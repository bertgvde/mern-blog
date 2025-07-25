import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';

dotenv.config();

// Connect to MongoDB
const mongoURI = process.env.MONGO_URI ;
const PORT = process.env.PORT || 3000;

if (!mongoURI) {
  console.error('MONGO_URI is not defined in the environment variables.');
  process.exit(1);
}
mongoose.connect(mongoURI, {
}).then(() => {
  console.log('Connected to MongoDB');
  }).catch(err => {
  console.error('MongoDB connection error:', err);
});

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(PORT, () => {
  console.log('Server is running on port', PORT); 
});

app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    res.status(statusCode).json({
        success: false,
        statusCode,
        message
    });
})
