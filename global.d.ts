import User from 'models/User';

// to make the file a module and avoid the TypeScript error
export {};

declare global {
  namespace Express {
    export type Session = { userId: string } & session.Session & Partial<session.SessionData>;

    export interface Request {
      user?: User;
      session: Session;
    }
  }

  export type APIError = TypeError | MongooseError | ErrorResponse;

  namespace NodeJS {
    export interface ProcessEnv {
      PORT: string;
      BASE_PATH: string;
      DATABASE_URL: string;
      SESSION_SECRET_KEY: string;
    }
  }
}
