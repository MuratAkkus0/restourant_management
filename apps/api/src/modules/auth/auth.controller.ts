import type { Request, Response } from "express";
import type { AcceptInviteInput, LoginInput, RegisterInput } from "@manegio/shared";
import { AppError } from "../../middleware/app-error.js";
import { authRepository } from "./auth.repository.js";
import { authService } from "./auth.service.js";
import { REFRESH_COOKIE_NAME, refreshCookieOptions } from "./token.util.js";

function sendAuthResult(
  res: Response,
  result: { accessToken: string; refreshToken: string; user: unknown },
) {
  res.cookie(REFRESH_COOKIE_NAME, result.refreshToken, refreshCookieOptions);
  res.json({ accessToken: result.accessToken, user: result.user });
}

export const authController = {
  async register(req: Request, res: Response) {
    const result = await authService.register(req.body as RegisterInput);
    sendAuthResult(res, result);
  },

  async login(req: Request, res: Response) {
    const result = await authService.login(req.body as LoginInput);
    sendAuthResult(res, result);
  },

  async refresh(req: Request, res: Response) {
    const rawToken = req.cookies?.[REFRESH_COOKIE_NAME] as string | undefined;
    if (!rawToken) {
      throw AppError.unauthorized("No refresh token provided.");
    }
    const result = await authService.refresh(rawToken);
    sendAuthResult(res, result);
  },

  async logout(req: Request, res: Response) {
    const rawToken = req.cookies?.[REFRESH_COOKIE_NAME] as string | undefined;
    await authService.logout(rawToken);
    res.clearCookie(REFRESH_COOKIE_NAME, { path: refreshCookieOptions.path });
    res.status(204).send();
  },

  async acceptInvite(req: Request, res: Response) {
    const result = await authService.acceptInvite(req.body as AcceptInviteInput);
    sendAuthResult(res, result);
  },

  async me(req: Request, res: Response) {
    const withMembership = await authRepository.findUserWithMembership(req.user!.id);
    const membership = withMembership?.memberships[0];
    if (!withMembership || !membership) {
      throw AppError.notFound("Account not found.");
    }
    res.json({
      id: withMembership.id,
      email: withMembership.email,
      firstName: withMembership.firstName,
      lastName: withMembership.lastName,
      companyId: membership.companyId,
      companyName: membership.company.name,
      companySlug: membership.company.slug,
      role: membership.role,
    });
  },
};
