import { UserRoles } from '.';

declare global {
  namespace Express {
    interface Request {
      user?: {
        role?: UserRoles;
      };
    }
  }
}

export {};
