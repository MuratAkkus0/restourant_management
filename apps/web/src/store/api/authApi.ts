import type { AcceptInviteInput, AuthResponse, LoginInput, RegisterInput } from '@manegio/shared';
import { apiClient } from './apiClient';
import { credentialsSet, loggedOut } from '../slices/authSlice';

export const authApi = apiClient.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation<AuthResponse, RegisterInput>({
      query: (body) => ({ url: '/api/auth/register', method: 'POST', body }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        const { data } = await queryFulfilled;
        dispatch(credentialsSet(data));
      },
    }),

    login: builder.mutation<AuthResponse, LoginInput>({
      query: (body) => ({ url: '/api/auth/login', method: 'POST', body }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        const { data } = await queryFulfilled;
        dispatch(credentialsSet(data));
      },
    }),

    acceptInvite: builder.mutation<AuthResponse, AcceptInviteInput>({
      query: (body) => ({ url: '/api/auth/accept-invite', method: 'POST', body }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        const { data } = await queryFulfilled;
        dispatch(credentialsSet(data));
      },
    }),

    // Called once on app boot to silently restore a session from the
    // httpOnly refresh cookie, without requiring the user to log in again.
    bootstrapSession: builder.mutation<AuthResponse, void>({
      query: () => ({ url: '/api/auth/refresh', method: 'POST' }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(credentialsSet(data));
        } catch {
          dispatch(loggedOut());
        }
      },
    }),

    logout: builder.mutation<void, void>({
      query: () => ({ url: '/api/auth/logout', method: 'POST' }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        await queryFulfilled.catch(() => undefined);
        dispatch(loggedOut());
        dispatch(apiClient.util.resetApiState());
      },
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useAcceptInviteMutation,
  useBootstrapSessionMutation,
  useLogoutMutation,
} = authApi;
