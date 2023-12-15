import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { saveUser } from 'app/auth';

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.REACT_APP_API,
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.user.token;
    if (token) headers.set('Authorization', `Bearer ${token}`);
    return headers;
  }
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 403) {
    api.dispatch(api.util.resetApiState());
    api.dispatch(saveUser(undefined));
    window.location.replace = '/sign-in';
  }

  return result;
}

export const api = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth,
  endpoints: builder => ({
    getChest: builder.query({
      query: () => 'mychest',
      providesTags: ['Chest']
    }),
    getProject: builder.query({
      query: (id) => `project/${id}/`,
      providesTags: ['Project']
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
      invalidatesTags: ['Project']
    }),
    deleteVersion: builder.mutation({
      query: (id) => ({
        url: `project/version/${id}/`,
        method: 'DELETE'
      }),
      invalidatesTags: ['Project', 'Trash']
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
      invalidatesTags: ['Trash', 'Project']
    }),
    createParticipant: builder.mutation({
      query: (body) => ({
        url: 'project/participant/',
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
    getNotifications: builder.query({
      query: (type = 'invites') => `notification/?type=${type}`,
      providesTags: ['Notifications']
    }),
    updateNotifications: builder.mutation({
      query: ({ id, response }) => ({
        url: `notification/invite/${id}/reply/`,
        method: 'PATCH',
        body: { response }
      }),
      invalidatesTags: ['Chest']
    })
  })
});

export const { 
  useGetChestQuery,
  useGetProjectQuery,
  useUpdateProjectMutation,
  useDeleteProjectMutation,
  useCreateVersionMutation,
  useUpdateVersionMutation,
  useDeleteVersionMutation,
  useGetTrashQuery,
  useGetRestoreTrashMutation,
  useCreateParticipantMutation,
  useUpdateParticipantMutation,
  useDeleteParticipantMutation,
  useCreateLinkMutation,
  useUpdateLinkMutation,
  useDeleteLinkMutation,
  useGetNotificationsQuery,
  useUpdateNotificationsMutation,
} = api;