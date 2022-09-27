import express, { Express } from 'express';

import cors from 'cors';
import dotenv from 'dotenv';
import mongoose, { ConnectOptions } from 'mongoose';

import activityRoutes from 'routes/activityRoutes';
import authRoutes from 'routes/authRoutes';

import authorize from 'middlewares/authorize';
import errorHandler from 'middlewares/errorHandler';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/activities', authorize, activityRoutes);

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
