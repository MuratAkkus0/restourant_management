import { prisma } from "../../config/prisma.js";
import type { Role } from "@prisma/client";

export const authRepository = {
  findUserByEmail(email: string) {
    return prisma.user.findUnique({ where: { email } });
  },

  findUserWithMembership(userId: string) {
    return prisma.user.findUnique({
      where: { id: userId },
      include: { memberships: { include: { company: true }, take: 1, orderBy: { createdAt: "asc" } } },
    });
  },

  async companySlugExists(slug: string) {
    const existing = await prisma.company.findUnique({ where: { slug }, select: { id: true } });
    return existing !== null;
  },

  /** Creates the company, the owning user, and the OWNER membership atomically. */
  createCompanyWithOwner(input: {
    companyName: string;
    slug: string;
    email: string;
    passwordHash: string;
    firstName: string;
    lastName: string;
  }) {
    return prisma.$transaction(async (tx) => {
      const company = await tx.company.create({
        data: { name: input.companyName, slug: input.slug },
      });
      const user = await tx.user.create({
        data: {
          email: input.email,
          passwordHash: input.passwordHash,
          firstName: input.firstName,
          lastName: input.lastName,
        },
      });
      const membership = await tx.membership.create({
        data: { userId: user.id, companyId: company.id, role: "OWNER" },
      });
      return { company, user, membership };
    });
  },

  createRefreshToken(input: { userId: string; tokenHash: string; expiresAt: Date }) {
    return prisma.refreshToken.create({ data: input });
  },

  findRefreshTokenByHash(tokenHash: string) {
    return prisma.refreshToken.findUnique({ where: { tokenHash } });
  },

  revokeRefreshToken(id: string) {
    return prisma.refreshToken.update({ where: { id }, data: { revokedAt: new Date() } });
  },

  revokeAllRefreshTokensForUser(userId: string) {
    return prisma.refreshToken.updateMany({
      where: { userId, revokedAt: null },
      data: { revokedAt: new Date() },
    });
  },

  findValidInviteByHash(tokenHash: string) {
    return prisma.invite.findFirst({
      where: { tokenHash, acceptedAt: null, expiresAt: { gt: new Date() } },
      include: { company: true },
    });
  },

  async createUserFromInvite(input: {
    inviteId: string;
    companyId: string;
    role: Role;
    email: string;
    passwordHash: string;
    firstName: string;
    lastName: string;
  }) {
    return prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          email: input.email,
          passwordHash: input.passwordHash,
          firstName: input.firstName,
          lastName: input.lastName,
        },
      });
      const membership = await tx.membership.create({
        data: { userId: user.id, companyId: input.companyId, role: input.role },
      });
      await tx.invite.update({ where: { id: input.inviteId }, data: { acceptedAt: new Date() } });
      return { user, membership };
    });
  },
};
