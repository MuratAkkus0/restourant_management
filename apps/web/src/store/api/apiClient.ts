import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';
import type { AuthResponse } from '@manegio/shared';
import type { RootState } from '../store';
import { credentialsSet, loggedOut } from '../slices/authSlice';

const rawBaseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_URL,
  // Sends/receives the httpOnly refresh cookie on every request.
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    const accessToken = (getState() as RootState).auth.accessToken;
    if (accessToken) {
      headers.set('Authorization', `Bearer ${accessToken}`);
    }
    return headers;
  },
});

let refreshInFlight: Promise<FetchBaseQueryError | undefined> | null = null;

/**
 * Wraps every query: on a 401 (expired access token) it transparently calls
 * /api/auth/refresh using the httpOnly cookie, stores the new short-lived
 * access token, and retries the original request exactly once. If the
 * refresh itself fails, the session is over and the user is logged out.
 */
const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions
) => {
  let result = await rawBaseQuery(args, api, extraOptions);

  if (result.error?.status === 401) {
    if (!refreshInFlight) {
      refreshInFlight = (async () => {
        const refreshResult = await rawBaseQuery(
          { url: '/api/auth/refresh', method: 'POST' },
          api,
          extraOptions
        );
        if (refreshResult.data) {
          api.dispatch(credentialsSet(refreshResult.data as AuthResponse));
          return undefined;
        }
        api.dispatch(loggedOut());
        return refreshResult.error;
      })();
    }

    const refreshError = await refreshInFlight;
    refreshInFlight = null;

    if (!refreshError) {
      result = await rawBaseQuery(args, api, extraOptions);
    }
  }

  return result;
};

export const apiClient = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Category', 'Product', 'Company', 'OpeningHours', 'Member', 'Invite', 'Menu', 'Stats'],
  endpoints: () => ({}),
});
