import type { CreateCategoryInput, ReorderCategoriesInput, UpdateCategoryInput } from '@manegio/shared';
import { apiClient } from './apiClient';

export type Category = {
  id: string;
  companyId: string;
  name: string;
  position: number;
  createdAt: string;
  updatedAt: string;
  _count: { products: number };
};

export const categoriesApi = apiClient.injectEndpoints({
  endpoints: (builder) => ({
    listCategories: builder.query<Category[], void>({
      query: () => '/api/admin/categories',
      transformResponse: (res: { categories: Category[] }) => res.categories,
      providesTags: (result) =>
        result
          ? [...result.map((c) => ({ type: 'Category' as const, id: c.id })), { type: 'Category', id: 'LIST' }]
          : [{ type: 'Category', id: 'LIST' }],
    }),

    createCategory: builder.mutation<Category, CreateCategoryInput>({
      query: (body) => ({ url: '/api/admin/categories', method: 'POST', body }),
      transformResponse: (res: { category: Category }) => res.category,
      invalidatesTags: [{ type: 'Category', id: 'LIST' }],
    }),

    updateCategory: builder.mutation<Category, { id: string; body: UpdateCategoryInput }>({
      query: ({ id, body }) => ({ url: `/api/admin/categories/${id}`, method: 'PATCH', body }),
      transformResponse: (res: { category: Category }) => res.category,
      invalidatesTags: (_res, _err, { id }) => [{ type: 'Category', id }, { type: 'Category', id: 'LIST' }],
    }),

    deleteCategory: builder.mutation<void, string>({
      query: (id) => ({ url: `/api/admin/categories/${id}`, method: 'DELETE' }),
      invalidatesTags: [{ type: 'Category', id: 'LIST' }, { type: 'Product', id: 'LIST' }],
    }),

    reorderCategories: builder.mutation<Category[], ReorderCategoriesInput>({
      query: (body) => ({ url: '/api/admin/categories/reorder', method: 'PATCH', body }),
      transformResponse: (res: { categories: Category[] }) => res.categories,
      invalidatesTags: [{ type: 'Category', id: 'LIST' }],
    }),
  }),
});

export const {
  useListCategoriesQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useReorderCategoriesMutation,
} = categoriesApi;
