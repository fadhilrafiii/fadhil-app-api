import express, { Express, NextFunction, Request, Response } from 'express';

import dotenv from 'dotenv';
import { errorHandler } from 'middlewares/errorHandler';
import mongoose, { ConnectOptions } from 'mongoose';

import authRoutes from 'routes/authRoutes';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(express.json());
app.use('/api/auth', authRoutes);

// Client Error handler
app.use(errorHandler);

// Connect to Database
const databaseUrl: string = process.env.DATABASE_URL || '';
mongoose.connect(
  databaseUrl,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  } as ConnectOptions,
  () => console.log('Database connection is established!'),
);

mongoose.connection.on('error', () => console.error('MongoDB Connection Error!'));

app.listen(port, () => {
  console.log('Server is running!');
});
