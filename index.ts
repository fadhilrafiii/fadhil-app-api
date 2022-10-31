import express, { Express } from 'express';
import session from 'express-session';

import MongoStore from 'connect-mongo';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose, { ConnectOptions } from 'mongoose';

import activityRoutes from 'routes/activityRoutes';
import authRoutes from 'routes/authRoutes';

import authorize from 'middlewares/authorize';
import errorHandler from 'middlewares/errorHandler';

import { SESSION_EXPIRY_ONE_DAY } from 'constants/auth';

dotenv.config();

const { PORT, DATABASE_URL, SESSION_SECRET_KEY }: NodeJS.ProcessEnv = process.env;

const app: Express = express();

// Connect to Database
mongoose.connect(
  DATABASE_URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  } as ConnectOptions,
  () => console.log('Database connection is established!'),
);
mongoose.connection.on('error', () => console.error('MongoDB Connection Error!'));

// General Middlewares: CORS, Session, JSON
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(
  session({
    name: 'sid',
    secret: SESSION_SECRET_KEY,
    saveUninitialized: false,
    proxy: true,
    store: MongoStore.create({
      mongoUrl: DATABASE_URL,
      ttl: SESSION_EXPIRY_ONE_DAY,
    }),
    cookie: {
      maxAge: SESSION_EXPIRY_ONE_DAY,
      sameSite: process.env.NODE_ENV === 'development',
      secure: process.env.NODE_ENV === 'production',
      httpOnly: false,
    },
    resave: false,
  }),
);

console.log(process.env);

app.use('/api/auth', authRoutes);
app.use('/api/activities', authorize, activityRoutes);

// Client Error handler
app.use(errorHandler);

app.listen(PORT, () => {
  console.log('Server is running!');
});
