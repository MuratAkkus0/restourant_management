/**
 * Read-side DTOs shared between the API responses and the frontend. These
 * are plain types (not zod schemas) because they describe server output,
 * not client input that needs runtime validation.
 */

export type PublicProduct = {
  id: string;
  name: string;
  description: string | null;
  priceCents: number;
  imageUrl: string | null;
};

export type PublicCategory = {
  id: string;
  name: string;
  products: PublicProduct[];
};

export type PublicMenu = {
  company: {
    name: string;
    slug: string;
    description: string | null;
    logoUrl: string | null;
    phone: string | null;
  };
  categories: PublicCategory[];
};

export type DashboardStats = {
  totalCategories: number;
  totalProducts: number;
  publishedProducts: number;
  totalMembers: number;
  isMenuPublished: boolean;
};
