import type { Request, Response } from "express";
import type {
  CreateInviteInput,
  UpdateCompanyInput,
  UpdateMemberRoleInput,
  UpdateOpeningHoursInput,
} from "@manegio/shared";
import { getParam } from "../../utils/request.js";
import { companiesService } from "./companies.service.js";

export const companiesController = {
  async getProfile(req: Request, res: Response) {
    const company = await companiesService.getProfile(req.tenant!.companyId);
    res.json({ company });
  },

  async updateProfile(req: Request, res: Response) {
    const company = await companiesService.updateProfile(req.tenant!.companyId, req.body as UpdateCompanyInput);
    res.json({ company });
  },

  async getOpeningHours(req: Request, res: Response) {
    const hours = await companiesService.getOpeningHours(req.tenant!.companyId);
    res.json({ hours });
  },

  async updateOpeningHours(req: Request, res: Response) {
    const hours = await companiesService.updateOpeningHours(
      req.tenant!.companyId,
      req.body as UpdateOpeningHoursInput,
    );
    res.json({ hours });
  },

  async listMembers(req: Request, res: Response) {
    const members = await companiesService.listMembers(req.tenant!.companyId);
    res.json({ members });
  },

  async updateMemberRole(req: Request, res: Response) {
    const member = await companiesService.updateMemberRole(
      req.tenant!.companyId,
      req.tenant!.membershipId,
      getParam(req, "membershipId"),
      req.body as UpdateMemberRoleInput,
    );
    res.json({ member });
  },

  async removeMember(req: Request, res: Response) {
    await companiesService.removeMember(
      req.tenant!.companyId,
      req.tenant!.membershipId,
      getParam(req, "membershipId"),
    );
    res.status(204).send();
  },

  async createInvite(req: Request, res: Response) {
    const invite = await companiesService.createInvite(
      req.tenant!.companyId,
      req.tenant!.role,
      req.body as CreateInviteInput,
    );
    res.status(201).json({ invite });
  },

  async listInvites(req: Request, res: Response) {
    const invites = await companiesService.listPendingInvites(req.tenant!.companyId);
    res.json({ invites });
  },

  async revokeInvite(req: Request, res: Response) {
    await companiesService.revokeInvite(req.tenant!.companyId, getParam(req, "inviteId"));
    res.status(204).send();
  },

  async getStats(req: Request, res: Response) {
    const stats = await companiesService.getDashboardStats(req.tenant!.companyId);
    res.json({ stats });
  },
};
