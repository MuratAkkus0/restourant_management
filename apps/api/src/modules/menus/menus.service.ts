import type { PublicMenu } from "@manegio/shared";
import { AppError } from "../../middleware/app-error.js";
import { companiesService } from "../companies/companies.service.js";
import { menusRepository } from "./menus.repository.js";

export const menusService = {
  async getAdminMenu(companyId: string) {
    const [categories, uncategorized] = await Promise.all([
      menusRepository.getAdminMenu(companyId),
      menusRepository.getUncategorizedProducts(companyId),
    ]);
    return { categories, uncategorizedProducts: uncategorized };
  },

  setPublished(companyId: string, isPublished: boolean) {
    return companiesService.setMenuPublished(companyId, isPublished);
  },

  async getPublicMenu(slug: string): Promise<PublicMenu> {
    const company = await menusRepository.findPublishedCompanyBySlug(slug);
    if (!company) {
      throw AppError.notFound("This menu is not available.");
    }
    return {
      company: {
        name: company.name,
        slug: company.slug,
        description: company.description,
        logoUrl: company.logoUrl,
        phone: company.phone,
      },
      categories: company.categories
        .filter((c) => c.products.length > 0)
        .map((c) => ({ id: c.id, name: c.name, products: c.products })),
    };
  },
};
