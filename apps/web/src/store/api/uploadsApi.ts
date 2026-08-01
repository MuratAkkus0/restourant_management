import { apiClient } from './apiClient';

export const uploadsApi = apiClient.injectEndpoints({
  endpoints: (builder) => ({
    uploadImage: builder.mutation<{ url: string }, File>({
      query: (file) => {
        const formData = new FormData();
        formData.append('file', file);
        return { url: '/api/admin/uploads', method: 'POST', body: formData };
      },
    }),
  }),
});

export const { useUploadImageMutation } = uploadsApi;
