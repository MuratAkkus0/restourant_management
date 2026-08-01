import type {
  CreateInviteInput,
  DashboardStats,
  Role,
  UpdateCompanyInput,
  UpdateMemberRoleInput,
  UpdateOpeningHoursInput,
  Weekday,
} from '@manegio/shared';
import { apiClient } from './apiClient';

export type Company = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  phone: string | null;
  logoUrl: string | null;
  street: string | null;
  houseNo: string | null;
  postalCode: string | null;
  city: string | null;
  state: string | null;
  country: string | null;
  isMenuPublished: boolean;
};

export type OpeningHour = {
  id: string;
  companyId: string;
  dayOfWeek: Weekday;
  isClosed: boolean;
  opensAt: string | null;
  closesAt: string | null;
};

export type Member = {
  id: string;
  userId: string;
  companyId: string;
  role: Role;
  createdAt: string;
  user: { id: string; email: string; firstName: string; lastName: string };
};

export type Invite = {
  id: string;
  companyId: string;
  email: string;
  role: Role;
  expiresAt: string;
};

export type CreatedInvite = {
  id: string;
  email: string;
  role: Role;
  expiresAt: string;
  acceptUrl: string;
};

export const companiesApi = apiClient.injectEndpoints({
  endpoints: (builder) => ({
    getCompanyProfile: builder.query<Company, void>({
      query: () => '/api/admin/companies/me',
      transformResponse: (res: { company: Company }) => res.company,
      providesTags: [{ type: 'Company', id: 'ME' }],
    }),

    updateCompanyProfile: builder.mutation<Company, UpdateCompanyInput>({
      query: (body) => ({ url: '/api/admin/companies/me', method: 'PATCH', body }),
      transformResponse: (res: { company: Company }) => res.company,
      invalidatesTags: [{ type: 'Company', id: 'ME' }],
    }),

    getOpeningHours: builder.query<OpeningHour[], void>({
      query: () => '/api/admin/companies/me/opening-hours',
      transformResponse: (res: { hours: OpeningHour[] }) => res.hours,
      providesTags: [{ type: 'OpeningHours', id: 'ME' }],
    }),

    updateOpeningHours: builder.mutation<OpeningHour[], UpdateOpeningHoursInput>({
      query: (body) => ({ url: '/api/admin/companies/me/opening-hours', method: 'PUT', body }),
      transformResponse: (res: { hours: OpeningHour[] }) => res.hours,
      invalidatesTags: [{ type: 'OpeningHours', id: 'ME' }],
    }),

    getMembers: builder.query<Member[], void>({
      query: () => '/api/admin/companies/me/members',
      transformResponse: (res: { members: Member[] }) => res.members,
      providesTags: (result) =>
        result
          ? [...result.map((m) => ({ type: 'Member' as const, id: m.id })), { type: 'Member', id: 'LIST' }]
          : [{ type: 'Member', id: 'LIST' }],
    }),

    updateMemberRole: builder.mutation<Member, { membershipId: string; body: UpdateMemberRoleInput }>({
      query: ({ membershipId, body }) => ({
        url: `/api/admin/companies/me/members/${membershipId}`,
        method: 'PATCH',
        body,
      }),
      transformResponse: (res: { member: Member }) => res.member,
      invalidatesTags: [{ type: 'Member', id: 'LIST' }],
    }),

    removeMember: builder.mutation<void, string>({
      query: (membershipId) => ({ url: `/api/admin/companies/me/members/${membershipId}`, method: 'DELETE' }),
      invalidatesTags: [{ type: 'Member', id: 'LIST' }],
    }),

    getInvites: builder.query<Invite[], void>({
      query: () => '/api/admin/companies/me/invites',
      transformResponse: (res: { invites: Invite[] }) => res.invites,
      providesTags: [{ type: 'Invite', id: 'LIST' }],
    }),

    createInvite: builder.mutation<CreatedInvite, CreateInviteInput>({
      query: (body) => ({ url: '/api/admin/companies/me/invites', method: 'POST', body }),
      transformResponse: (res: { invite: CreatedInvite }) => res.invite,
      invalidatesTags: [{ type: 'Invite', id: 'LIST' }],
    }),

    revokeInvite: builder.mutation<void, string>({
      query: (inviteId) => ({ url: `/api/admin/companies/me/invites/${inviteId}`, method: 'DELETE' }),
      invalidatesTags: [{ type: 'Invite', id: 'LIST' }],
    }),

    getDashboardStats: builder.query<DashboardStats, void>({
      query: () => '/api/admin/companies/me/stats',
      transformResponse: (res: { stats: DashboardStats }) => res.stats,
      providesTags: [{ type: 'Stats', id: 'ME' }],
    }),
  }),
});

export const {
  useGetCompanyProfileQuery,
  useUpdateCompanyProfileMutation,
  useGetOpeningHoursQuery,
  useUpdateOpeningHoursMutation,
  useGetMembersQuery,
  useUpdateMemberRoleMutation,
  useRemoveMemberMutation,
  useGetInvitesQuery,
  useCreateInviteMutation,
  useRevokeInviteMutation,
  useGetDashboardStatsQuery,
} = companiesApi;
