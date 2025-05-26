// types/express/index.d.ts
import session from "express-session";

declare module "express-session" {
  interface SessionData {
    user?: {
      id: string;
      email: string;
      phone: string;
      role?: string; // add more fields if needed
    };
  }
}
