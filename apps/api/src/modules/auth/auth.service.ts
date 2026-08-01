import crypto from "node:crypto";
import bcrypt from "bcryptjs";
import slugify from "slugify";
import type { AcceptInviteInput, AuthResponse, LoginInput, RegisterInput } from "@manegio/shared";
import { AppError } from "../../middleware/app-error.js";
import { authRepository } from "./auth.repository.js";
import {
  hashToken,
  refreshTokenExpiryDate,
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
} from "./token.util.js";

const BCRYPT_ROUNDS = 12;

async function generateUniqueSlug(companyName: string): Promise<string> {
  const base = slugify(companyName, { lower: true, strict: true }) || "company";
  let candidate = base;
  let suffix = 1;
  // Extremely unlikely to loop more than once or twice in practice.
  while (await authRepository.companySlugExists(candidate)) {
    suffix += 1;
    candidate = `${base}-${suffix}`;
  }
  return candidate;
}

function buildAuthUser(params: {
  userId: string;
  email: string;
  firstName: string;
  lastName: string;
  companyId: string;
  companyName: string;
  companySlug: string;
  role: "OWNER" | "ADMIN" | "STAFF";
}): AuthResponse["user"] {
  return {
    id: params.userId,
    email: params.email,
    firstName: params.firstName,
    lastName: params.lastName,
    companyId: params.companyId,
    companyName: params.companyName,
    companySlug: params.companySlug,
    role: params.role,
  };
}

async function issueTokenPair(userId: string): Promise<{ accessToken: string; refreshToken: string }> {
  const accessToken = signAccessToken(userId);
  const jti = crypto.randomUUID();
  const refreshToken = signRefreshToken(userId, jti);
  await authRepository.createRefreshToken({
    userId,
    tokenHash: hashToken(refreshToken),
    expiresAt: refreshTokenExpiryDate(),
  });
  return { accessToken, refreshToken };
}

export const authService = {
  async register(input: RegisterInput): Promise<AuthResponse & { refreshToken: string }> {
    const existing = await authRepository.findUserByEmail(input.email);
    if (existing) {
      throw AppError.conflict("An account with this email already exists.");
    }

    const slug = await generateUniqueSlug(input.companyName);
    const passwordHash = await bcrypt.hash(input.password, BCRYPT_ROUNDS);

    const { company, user, membership } = await authRepository.createCompanyWithOwner({
      companyName: input.companyName,
      slug,
      email: input.email,
      passwordHash,
      firstName: input.firstName,
      lastName: input.lastName,
    });

    const { accessToken, refreshToken } = await issueTokenPair(user.id);

    return {
      accessToken,
      refreshToken,
      user: buildAuthUser({
        userId: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        companyId: company.id,
        companyName: company.name,
        companySlug: company.slug,
        role: membership.role,
      }),
    };
  },

  async login(input: LoginInput): Promise<AuthResponse & { refreshToken: string }> {
    const user = await authRepository.findUserByEmail(input.email);
    const isValid = user ? await bcrypt.compare(input.password, user.passwordHash) : false;

    // Same generic error whether the email doesn't exist or the password is
    // wrong, so we never leak which emails are registered.
    if (!user || !isValid) {
      throw AppError.unauthorized("Invalid email or password.");
    }

    const withMembership = await authRepository.findUserWithMembership(user.id);
    const membership = withMembership?.memberships[0];
    if (!membership) {
      throw AppError.forbidden("This account is not linked to any company.");
    }

    const { accessToken, refreshToken } = await issueTokenPair(user.id);

    return {
      accessToken,
      refreshToken,
      user: buildAuthUser({
        userId: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        companyId: membership.companyId,
        companyName: membership.company.name,
        companySlug: membership.company.slug,
        role: membership.role,
      }),
    };
  },

  async refresh(rawToken: string): Promise<AuthResponse & { refreshToken: string }> {
    let payload;
    try {
      payload = verifyRefreshToken(rawToken);
    } catch {
      throw AppError.unauthorized("Invalid or expired refresh token.");
    }

    const stored = await authRepository.findRefreshTokenByHash(hashToken(rawToken));

    if (!stored || stored.revokedAt || stored.expiresAt < new Date() || stored.userId !== payload.sub) {
      // If the token was already used/revoked this may be a replay attack;
      // revoke everything for the user as a precaution.
      if (stored && !stored.revokedAt) {
        await authRepository.revokeAllRefreshTokensForUser(payload.sub);
      }
      throw AppError.unauthorized("Invalid or expired refresh token.");
    }

    // Rotate: the old refresh token is consumed exactly once.
    await authRepository.revokeRefreshToken(stored.id);

    const withMembership = await authRepository.findUserWithMembership(payload.sub);
    const membership = withMembership?.memberships[0];
    if (!withMembership || !membership) {
      throw AppError.unauthorized("Account no longer exists.");
    }

    const { accessToken, refreshToken } = await issueTokenPair(payload.sub);

    return {
      accessToken,
      refreshToken,
      user: buildAuthUser({
        userId: withMembership.id,
        email: withMembership.email,
        firstName: withMembership.firstName,
        lastName: withMembership.lastName,
        companyId: membership.companyId,
        companyName: membership.company.name,
        companySlug: membership.company.slug,
        role: membership.role,
      }),
    };
  },

  async logout(rawToken: string | undefined): Promise<void> {
    if (!rawToken) return;
    const stored = await authRepository.findRefreshTokenByHash(hashToken(rawToken));
    if (stored && !stored.revokedAt) {
      await authRepository.revokeRefreshToken(stored.id);
    }
  },

  async acceptInvite(input: AcceptInviteInput): Promise<AuthResponse & { refreshToken: string }> {
    const invite = await authRepository.findValidInviteByHash(hashToken(input.token));
    if (!invite) {
      throw AppError.badRequest("This invite link is invalid or has expired.");
    }

    const existing = await authRepository.findUserByEmail(invite.email);
    if (existing) {
      throw AppError.conflict("An account with this email already exists.");
    }

    const passwordHash = await bcrypt.hash(input.password, BCRYPT_ROUNDS);
    const { user, membership } = await authRepository.createUserFromInvite({
      inviteId: invite.id,
      companyId: invite.companyId,
      role: invite.role,
      email: invite.email,
      passwordHash,
      firstName: input.firstName,
      lastName: input.lastName,
    });

    const { accessToken, refreshToken } = await issueTokenPair(user.id);

    return {
      accessToken,
      refreshToken,
      user: buildAuthUser({
        userId: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        companyId: invite.companyId,
        companyName: invite.company.name,
        companySlug: invite.company.slug,
        role: membership.role,
      }),
    };
  },
};
