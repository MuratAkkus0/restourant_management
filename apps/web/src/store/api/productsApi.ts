import type { CreateProductInput, ReorderProductsInput, UpdateProductInput } from '@manegio/shared';
import { apiClient } from './apiClient';

export type Product = {
  id: string;
  companyId: string;
  categoryId: string | null;
  name: string;
  description: string | null;
  priceCents: number;
  imageUrl: string | null;
  isPublished: boolean;
  position: number;
  createdAt: string;
  updatedAt: string;
  category: { id: string; name: string } | null;
};

export const productsApi = apiClient.injectEndpoints({
  endpoints: (builder) => ({
    listProducts: builder.query<Product[], void>({
      query: () => '/api/admin/products',
      transformResponse: (res: { products: Product[] }) => res.products,
      providesTags: (result) =>
        result
          ? [...result.map((p) => ({ type: 'Product' as const, id: p.id })), { type: 'Product', id: 'LIST' }]
          : [{ type: 'Product', id: 'LIST' }],
    }),

    getProduct: builder.query<Product, string>({
      query: (id) => `/api/admin/products/${id}`,
      transformResponse: (res: { product: Product }) => res.product,
      providesTags: (_result, _error, id) => [{ type: 'Product', id }],
    }),

    createProduct: builder.mutation<Product, CreateProductInput>({
      query: (body) => ({ url: '/api/admin/products', method: 'POST', body }),
      transformResponse: (res: { product: Product }) => res.product,
      invalidatesTags: [{ type: 'Product', id: 'LIST' }],
    }),

    updateProduct: builder.mutation<Product, { id: string; body: UpdateProductInput }>({
      query: ({ id, body }) => ({ url: `/api/admin/products/${id}`, method: 'PATCH', body }),
      transformResponse: (res: { product: Product }) => res.product,
      invalidatesTags: (_res, _err, { id }) => [{ type: 'Product', id }, { type: 'Product', id: 'LIST' }],
    }),

    deleteProduct: builder.mutation<void, string>({
      query: (id) => ({ url: `/api/admin/products/${id}`, method: 'DELETE' }),
      invalidatesTags: [{ type: 'Product', id: 'LIST' }],
    }),

    setProductPublished: builder.mutation<Product, { id: string; isPublished: boolean }>({
      query: ({ id, isPublished }) => ({
        url: `/api/admin/products/${id}/publish`,
        method: 'PATCH',
        body: { isPublished },
      }),
      transformResponse: (res: { product: Product }) => res.product,
      invalidatesTags: (_res, _err, { id }) => [{ type: 'Product', id }, { type: 'Product', id: 'LIST' }],
    }),

    reorderProducts: builder.mutation<Product[], ReorderProductsInput>({
      query: (body) => ({ url: '/api/admin/products/reorder', method: 'PATCH', body }),
      transformResponse: (res: { products: Product[] }) => res.products,
      invalidatesTags: [{ type: 'Product', id: 'LIST' }],
    }),
  }),
});

export const {
  useListProductsQuery,
  useGetProductQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useSetProductPublishedMutation,
  useReorderProductsMutation,
} = productsApi;
