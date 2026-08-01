import type { Role } from "@prisma/client";

declare global {
  namespace Express {
    interface Request {
      /** Set by auth.middleware after verifying the access token. */
      user?: {
        id: string;
      };
      /**
       * Set by tenant.middleware from the authenticated user's membership -
       * NEVER derived from client-supplied input. This is what makes
       * cross-tenant access structurally impossible: every module resolves
       * its companyId from here.
       */
      tenant?: {
        companyId: string;
        membershipId: string;
        role: Role;
      };
    }
  }
}

export {};
