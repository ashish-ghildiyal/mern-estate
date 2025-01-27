import express from 'express';
import mongoose from 'mongoose';
import userRoute from './routes/user.route.js';
import authRoute from './routes/auth.route.js';
import dotenv from 'dotenv';
dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO)
.then(() => {
  console.log('Connected to MongoDB !!!');
})
.catch((error) => {
    console.log('Error:', error);
})
const app = express();
app.use(express.json());

app.listen(3000, () => {
  console.log('Server is running on port 3000 !!!');
});

app.use('/api/user', userRoute);
app.use('/api/auth', authRoute);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  return res.status(statusCode).json({ 
    success: false,
    statusCode,
    message 
  });
})
