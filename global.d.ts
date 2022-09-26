import User from 'models/User';

// to make the file a module and avoid the TypeScript error
export {};

declare global {
  namespace Express {
    export interface Request {
      user?: User;
    }
  }

  export type APIError = TypeError | MongooseError | ErrorResponse;
}
