import type { PublicMenu } from '@manegio/shared';
import { apiClient } from './apiClient';
import type { Category } from './categoriesApi';
import type { Product } from './productsApi';

export type AdminMenu = {
  categories: (Category & { products: Product[] })[];
  uncategorizedProducts: Product[];
};

export const menuApi = apiClient.injectEndpoints({
  endpoints: (builder) => ({
    getAdminMenu: builder.query<AdminMenu, void>({
      query: () => '/api/admin/menu',
      providesTags: [{ type: 'Menu', id: 'ME' }],
    }),

    setMenuPublished: builder.mutation<{ isMenuPublished: boolean }, boolean>({
      query: (isPublished) => ({ url: '/api/admin/menu/publish', method: 'PATCH', body: { isPublished } }),
      transformResponse: (res: { company: { isMenuPublished: boolean } }) => ({
        isMenuPublished: res.company.isMenuPublished,
      }),
      invalidatesTags: [{ type: 'Menu', id: 'ME' }, { type: 'Company', id: 'ME' }, { type: 'Stats', id: 'ME' }],
    }),

    getPublicMenu: builder.query<PublicMenu, string>({
      query: (companySlug) => `/api/public/menu/${companySlug}`,
    }),
  }),
});

export const { useGetAdminMenuQuery, useSetMenuPublishedMutation, useGetPublicMenuQuery } = menuApi;
