import { apiClient } from './apiClient';

export const qrApi = apiClient.injectEndpoints({
  endpoints: (builder) => ({
    getQrCodeImageUrl: builder.query<string, void>({
      query: () => ({
        url: '/api/admin/qr?format=png',
        // The QR endpoint returns a binary PNG, not JSON - turn it into an
        // object URL so it can be dropped straight into an <img src>.
        responseHandler: async (response: Response) => URL.createObjectURL(await response.blob()),
      }),
    }),

    getQrMenuUrl: builder.query<string, void>({
      query: () => '/api/admin/qr/meta',
      transformResponse: (res: { menuUrl: string }) => res.menuUrl,
    }),
  }),
});

export const { useGetQrCodeImageUrlQuery, useGetQrMenuUrlQuery } = qrApi;
