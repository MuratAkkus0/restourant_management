import type { CreateInviteInput, UpdateCompanyInput, UpdateMemberRoleInput, UpdateOpeningHoursInput } from "@manegio/shared";
import type { Role } from "@prisma/client";
import { env } from "../../config/env.js";
import { AppError } from "../../middleware/app-error.js";
import { generateOpaqueToken, hashToken } from "../../utils/crypto.js";
import { companiesRepository } from "./companies.repository.js";

const INVITE_TTL_DAYS = 7;

export const companiesService = {
  async getProfile(companyId: string) {
    const company = await companiesRepository.findById(companyId);
    if (!company) {
      throw AppError.notFound("Company not found.");
    }
    return company;
  },

  async updateProfile(companyId: string, input: UpdateCompanyInput) {
    if (input.slug) {
      const taken = await companiesRepository.slugTaken(input.slug, companyId);
      if (taken) {
        throw AppError.conflict("This slug is already in use.");
      }
    }
    return companiesRepository.update(companyId, input);
  },

  async setMenuPublished(companyId: string, isMenuPublished: boolean) {
    return companiesRepository.setMenuPublished(companyId, isMenuPublished);
  },

  getOpeningHours(companyId: string) {
    return companiesRepository.listOpeningHours(companyId);
  },

  updateOpeningHours(companyId: string, input: UpdateOpeningHoursInput) {
    return companiesRepository.upsertOpeningHours(companyId, input.hours);
  },

  listMembers(companyId: string) {
    return companiesRepository.listMembers(companyId);
  },

  async updateMemberRole(
    companyId: string,
    actingMembershipId: string,
    targetMembershipId: string,
    input: UpdateMemberRoleInput,
  ) {
    const target = await companiesRepository.findMemberById(companyId, targetMembershipId);
    if (!target) {
      throw AppError.notFound("Member not found.");
    }
    if (target.role === "OWNER") {
      throw AppError.forbidden("The owner's role cannot be changed.");
    }
    if (target.id === actingMembershipId) {
      throw AppError.forbidden("You cannot change your own role.");
    }
    return companiesRepository.updateMemberRole(targetMembershipId, input.role as Role);
  },

  async removeMember(companyId: string, actingMembershipId: string, targetMembershipId: string) {
    const target = await companiesRepository.findMemberById(companyId, targetMembershipId);
    if (!target) {
      throw AppError.notFound("Member not found.");
    }
    if (target.role === "OWNER") {
      throw AppError.forbidden("The owner cannot be removed.");
    }
    if (target.id === actingMembershipId) {
      throw AppError.forbidden("You cannot remove yourself.");
    }
    await companiesRepository.removeMember(targetMembershipId);
  },

  async createInvite(companyId: string, actingRole: Role, input: CreateInviteInput) {
    // ADMINs may only invite STAFF; only the OWNER can invite another ADMIN.
    if (input.role === "ADMIN" && actingRole !== "OWNER") {
      throw AppError.forbidden("Only the owner can invite an admin.");
    }

    const rawToken = generateOpaqueToken();
    const expiresAt = new Date(Date.now() + INVITE_TTL_DAYS * 24 * 60 * 60 * 1000);
    const invite = await companiesRepository.createInvite({
      companyId,
      email: input.email,
      role: input.role,
      tokenHash: hashToken(rawToken),
      expiresAt,
    });

    return {
      id: invite.id,
      email: invite.email,
      role: invite.role,
      expiresAt: invite.expiresAt,
      // The raw token is only ever returned once, at creation time - it is
      // never retrievable again since only its hash is stored.
      acceptUrl: `${env.WEB_PUBLIC_URL}/accept-invite?token=${rawToken}`,
    };
  },

  listPendingInvites(companyId: string) {
    return companiesRepository.listPendingInvites(companyId);
  },

  async revokeInvite(companyId: string, inviteId: string) {
    const invite = await companiesRepository.findInviteInCompany(companyId, inviteId);
    if (!invite) {
      throw AppError.notFound("Invite not found.");
    }
    await companiesRepository.deleteInvite(inviteId);
  },

  getDashboardStats(companyId: string) {
    return companiesRepository.stats(companyId);
  },
};
