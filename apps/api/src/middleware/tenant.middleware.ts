import type { NextFunction, Request, Response } from "express";
import type { Role } from "@prisma/client";
import { prisma } from "../config/prisma.js";
import { AppError } from "./app-error.js";

/**
 * Resolves the authenticated user's tenant (company + role) from their
 * membership and attaches it as `req.tenant`. This must run after
 * `requireAuth`. Every module downstream reads `req.tenant.companyId` for
 * its queries - a client can never pass its own companyId, which is what
 * makes cross-tenant reads/writes structurally impossible.
 *
 * A user has exactly one membership in this version of the product (no
 * multi-company switcher yet); if that changes, this is the single place
 * that would grow an "active company" selector.
 */
export async function resolveTenant(req: Request, _res: Response, next: NextFunction) {
  if (!req.user) {
    throw AppError.unauthorized();
  }

  const membership = await prisma.membership.findFirst({
    where: { userId: req.user.id },
    orderBy: { createdAt: "asc" },
  });

  if (!membership) {
    throw AppError.forbidden("This account is not linked to any company.");
  }

  req.tenant = {
    companyId: membership.companyId,
    membershipId: membership.id,
    role: membership.role,
  };
  next();
}

/** Restricts a route to one or more roles within the resolved tenant. Must run after resolveTenant. */
export function requireRole(...roles: Role[]) {
  return (req: Request, _res: Response, next: NextFunction) => {
    if (!req.tenant || !roles.includes(req.tenant.role)) {
      throw AppError.forbidden();
    }
    next();
  };
}
