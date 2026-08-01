import { prisma } from "../../config/prisma.js";
import type { UpdateCompanyInput, UpdateOpeningHoursInput } from "@manegio/shared";
import type { Role } from "@prisma/client";

export const companiesRepository = {
  findById(companyId: string) {
    return prisma.company.findUnique({ where: { id: companyId } });
  },

  slugTaken(slug: string, excludeCompanyId: string) {
    return prisma.company.findFirst({ where: { slug, id: { not: excludeCompanyId } }, select: { id: true } });
  },

  update(companyId: string, data: UpdateCompanyInput) {
    return prisma.company.update({ where: { id: companyId }, data });
  },

  setMenuPublished(companyId: string, isMenuPublished: boolean) {
    return prisma.company.update({ where: { id: companyId }, data: { isMenuPublished } });
  },

  listOpeningHours(companyId: string) {
    return prisma.openingHour.findMany({ where: { companyId }, orderBy: { dayOfWeek: "asc" } });
  },

  async upsertOpeningHours(companyId: string, hours: UpdateOpeningHoursInput["hours"]) {
    await prisma.$transaction(
      hours.map((h) =>
        prisma.openingHour.upsert({
          where: { companyId_dayOfWeek: { companyId, dayOfWeek: h.dayOfWeek } },
          create: {
            companyId,
            dayOfWeek: h.dayOfWeek,
            isClosed: h.isClosed,
            opensAt: h.opensAt ?? null,
            closesAt: h.closesAt ?? null,
          },
          update: {
            isClosed: h.isClosed,
            opensAt: h.opensAt ?? null,
            closesAt: h.closesAt ?? null,
          },
        }),
      ),
    );
    return companiesRepository.listOpeningHours(companyId);
  },

  listMembers(companyId: string) {
    return prisma.membership.findMany({
      where: { companyId },
      include: { user: { select: { id: true, email: true, firstName: true, lastName: true } } },
      orderBy: { createdAt: "asc" },
    });
  },

  findMemberById(companyId: string, membershipId: string) {
    return prisma.membership.findFirst({ where: { id: membershipId, companyId } });
  },

  updateMemberRole(membershipId: string, role: Role) {
    return prisma.membership.update({ where: { id: membershipId }, data: { role } });
  },

  removeMember(membershipId: string) {
    return prisma.membership.delete({ where: { id: membershipId } });
  },

  createInvite(input: { companyId: string; email: string; role: Role; tokenHash: string; expiresAt: Date }) {
    return prisma.invite.create({ data: input });
  },

  listPendingInvites(companyId: string) {
    return prisma.invite.findMany({
      where: { companyId, acceptedAt: null, expiresAt: { gt: new Date() } },
      orderBy: { createdAt: "desc" },
    });
  },

  findInviteInCompany(companyId: string, inviteId: string) {
    return prisma.invite.findFirst({ where: { id: inviteId, companyId } });
  },

  deleteInvite(inviteId: string) {
    return prisma.invite.delete({ where: { id: inviteId } });
  },

  async stats(companyId: string) {
    const [totalCategories, totalProducts, publishedProducts, totalMembers, company] = await Promise.all([
      prisma.category.count({ where: { companyId } }),
      prisma.product.count({ where: { companyId } }),
      prisma.product.count({ where: { companyId, isPublished: true } }),
      prisma.membership.count({ where: { companyId } }),
      prisma.company.findUnique({ where: { id: companyId }, select: { isMenuPublished: true } }),
    ]);
    return {
      totalCategories,
      totalProducts,
      publishedProducts,
      totalMembers,
      isMenuPublished: company?.isMenuPublished ?? false,
    };
  },
};
