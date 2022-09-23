import express, { Express, Request, Response } from 'express';

import dotenv from 'dotenv';
import mongoose, { ConnectOptions } from 'mongoose';

import authRoutes from 'routes/authRoutes';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(express.json());
app.get('/', (req: Request, res: Response) => {
  res.send('FADHIL APP API YEAY');
});
app.use('/api/auth', authRoutes);

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
