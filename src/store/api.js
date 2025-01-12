import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { signOut } from 'firebase/auth';
import { auth } from 'utils/firebase';

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.REACT_APP_API,
  prepareHeaders: (headers, { getState }) => {
    const user = getState().auth.user;
    if (user && user.token) {
      headers.set('Authorization', `Bearer ${user.token}`);
    }
    return headers;
  }
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 403) {
    if (result.error.data.code === 'firebase-expired-token' || result.error.data.code === 'firebase-invalid-token') {
      try {
        const user = auth.currentUser;

        if (user) {
          const newToken = await user.getIdToken(true);
          api.setHeader('Authorization', `Bearer ${newToken}`);
          result = await baseQuery(args, api, extraOptions);
        }
      } catch (error) {
        console.error('Error refreshing token:', error);
        signOut(auth);
        window.location.replace('/sign-in');
      }
    }
  }
  return result;
}

export const api = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth,
  endpoints: builder => ({
    getAccount: builder.query({
      query: () => 'account/',
      providesTags: ['Account']
    }),
    createAccount: builder.mutation({
      query: ({ type, data }) => ({
        url: `account/${type}/`,
        method: 'POST',
        body: data
      }),
      invalidatesTags: ['Account']
    }),
    getUpdateAccount: builder.mutation({
      query: () => ({
        url: 'account/convert/',
        method: 'GET'
      }),
      invalidatesTags: ['Account']
    }),
    getChest: builder.query({
      query: () => 'mychest/',
      providesTags: ['Chest']
    }),
    getProject: builder.query({
      query: (id) => `project/${id}/`,
      providesTags: ['Project']
    }),
    createProject: builder.mutation({
      query: (body) => ({
        url: 'project/',
        method: 'POST',
        body
      }),
      invalidatesTags: ['Chest', 'Account']
    }),
    updateProject: builder.mutation({
      query: ({ id, data }) => ({
        url: `project/${id}/`,
        method: 'PATCH',
        body: data
      }),
      invalidatesTags: ['Project', 'Chest']
    }),
    deleteProject: builder.mutation({
      query: (id) => ({
        url: `project/${id}/`,
        method: 'DELETE'
      }),
      invalidatesTags: ['Chest']
    }),
    createVersion: builder.mutation({
      query: (body) => ({
        url: 'project/version/',
        method: 'POST',
        body
      }),
      invalidatesTags: ['Project']
    }),
    updateVersion: builder.mutation({
      query: ({ id, name }) => ({
        url: `project/version/${id}/`,
        method: 'PATCH',
        body: { name }
      }),
      invalidatesTags: ['Project', 'Chest']
    }),
    deleteVersion: builder.mutation({
      query: (id) => ({
        url: `project/version/${id}/`,
        method: 'DELETE'
      }),
      invalidatesTags: ['Project', 'Trash', 'Chest']
    }),
    getTrash: builder.query({
      query: (id) => `project/${id}/trash/`,
      providesTags: ['Trash']
    }),
    getRestoreTrash: builder.mutation({
      query: (id) => ({
        url: `project/version/${id}/restore/`,
        method: 'GET'
      }),
      invalidatesTags: ['Trash', 'Project', 'Chest']
    }),
    createParticipant: builder.mutation({
      query: (body) => ({
        url: 'project/participant/',
        method: 'POST',
        body
      }),
      invalidatesTags: ['Project']
    }),
    createInvite: builder.mutation({
      query: (body) => ({
        url: 'project/participant/invitation/',
        method: 'POST',
        body
      }),
      invalidatesTags: ['Project']
    }),
    updateParticipant: builder.mutation({
      query: ({ id, role }) => ({
        url: `project/participant/${id}/`,
        method: 'PATCH',
        body: { role }
      }),
      invalidatesTags: ['Project']
    }),
    deleteParticipant: builder.mutation({
      query: ({ id, role }) => ({
        url: `project/participant/${id}/`,
        method: 'DELETE',
        body: { role }
      }),
      invalidatesTags: ['Project']
    }),
    createLink: builder.mutation({
      query: (body) => ({
        url: 'shared/link/',
        method: 'POST',
        body
      }),
      invalidatesTags: ['Project']
    }),
    updateLink: builder.mutation({
      query: ({ id, data }) => ({
        url: `shared/link/${id}/`,
        method: 'PATCH',
        body: data
      }),
      invalidatesTags: ['Project']
    }),
    deleteLink: builder.mutation({
      query: (id) => ({
        url: `shared/link/${id}/`,
        method: 'DELETE'
      }),
      invalidatesTags: ['Project']
    }),
    getNewNotifications: builder.query({
      query: () => 'account/?fields=new_notifications',
      providesTags: ['NewNotifications']
    }),
    getNotifications: builder.query({
      query: (type = 'invites') => `notification/?type=${type}`,
      providesTags: ['Notifications']
    }),
    getNewNotificationsData: builder.query({
      query: () => 'notification/',
      providesTags: ['NewNotificationsData']
    }),
    updateNotifications: builder.mutation({
      query: ({ id, response }) => ({
        url: `notification/invite/${id}/reply/`,
        method: 'PATCH',
        body: { response }
      }),
      invalidatesTags: ['Chest']
    }),
    updateBlockedUsers: builder.mutation({
      query: (id) => ({
        url: `notification/permission/block/`,
        body: { user: id }
      })
    }),
    getUser: builder.query({
      query: (keyword) => `user/?search=${keyword}`,
      providesTags: ['Users']
    }),
    getShareds: builder.query({
      query: () => 'shared/',
      providesTags: ['Shared']
    }),
    updateSharedUser: builder.mutation({
      query: ({ id, data }) => ({
        url: `shared/user/${id}/`,
        method: 'PATCH',
        body: data
      }),
      invalidatesTags: ['Project']
    }),
    deleteSharedUser: builder.mutation({
      query: (id) => ({
        url: `shared/user/${id}/`,
        method: 'DELETE'
      }),
      invalidatesTags: ['Project']
    }),
    getPermissions: builder.query({
      query: () => 'notification/permission/',
      providesTags: ['Permissions']
    }),
    createPermission: builder.mutation({
      query: (body) => ({
        url: `notification/permission/`,
        method: 'POST',
        body: body
      }),
      invalidatesTags: ['Permissions']
    }),
    deletePermission: builder.mutation({
      query: (id) => ({
        url: `notification/permission/${id}/`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Permissions']
    }),
    updatePermission: builder.mutation({
      query: () => ({
        url: 'notification/permission/toggle/',
        method: 'GET'
      }),
      invalidatesTags: ['Permissions']
    }),
    getTrackSource: builder.query({
      query: (id) => `project/version/${id}/url/`
    }),
    getFaqs: builder.query({
      query: (lang) => `faq/?lang=${lang}`,
      providesTags: ['Faqs'],
    }),
    getTerms: builder.query({
      query: (lang) => `termsandconditions/?lang=${lang}`,
      providesTags: ['Terms']
    }),
    getBetaAccess: builder.query({
      query: (email) => `hasbetaaccess/?email=${encodeURIComponent(email)}`,
      providesTags: ['Beta']
    }),
    updateTrackPlay: builder.mutation({
      query: ({ id, anonymous, token }) => {
        let url = '';

        if (anonymous) {
          url = `shared/link/token/${token}/play/`
        } else {
          url = `project/version/${id}/play/`;
        }

        return {
          url,
          method: 'POST'
        }
      }
    }),
    getSharedTrack: builder.query({
      query: (token) => `shared/link/token/${token}`
    }),
    getPlans: builder.query({
      query: () => ({
        url: 'plan/',
        method: 'GET'
      }),
      providesTags: ['Plans']
    }),
    createSubscription: builder.mutation({
      query: (plan) => ({
        url: 'account/subscription/',
        method: 'POST',
        body: { plan }
      }),
      invalidatesTags: ['Account'],
    }),
    deleteSubscription: builder.mutation({
      query: (id) => ({
        url: `account/subscription/${id}/`,
        body: {
          status: 'canceled'
        },
        method: 'PATCH'
      }),
      invalidatesTags: ['Account']
    })
  })
});

export const {
  useGetChestQuery,
  useGetAccountQuery,
  useGetUpdateAccountMutation,
  useLazyGetAccountQuery,
  useCreateAccountMutation,
  useGetProjectQuery,
  useCreateProjectMutation,
  useUpdateProjectMutation,
  useDeleteProjectMutation,
  useCreateVersionMutation,
  useUpdateVersionMutation,
  useDeleteVersionMutation,
  useGetTrashQuery,
  useGetRestoreTrashMutation,
  useCreateParticipantMutation,
  useCreateInviteMutation,
  useUpdateParticipantMutation,
  useDeleteParticipantMutation,
  useCreateLinkMutation,
  useUpdateLinkMutation,
  useDeleteLinkMutation,
  useGetNewNotificationsQuery,
  useGetNotificationsQuery,
  useGetNewNotificationsDataQuery,
  useUpdateNotificationsMutation,
  useGetUserQuery,
  useGetSharedsQuery,
  useUpdateSharedUserMutation,
  useDeleteSharedUserMutation,
  useGetPermissionsQuery,
  useDeletePermissionMutation,
  useCreatePermissionMutation,
  useUpdatePermissionMutation,
  useLazyGetTrackSourceQuery,
  useGetFaqsQuery,
  useGetTermsQuery,
  useLazyGetBetaAccessQuery,
  useUpdateTrackPlayMutation,
  useLazyGetSharedTrackQuery,
  useGetPlansQuery,
  useCreateSubscriptionMutation,
  useDeleteSubscriptionMutation,
} = api;

export { api as apiSlice }