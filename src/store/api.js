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
      query: () => 'mychest/',
      providesTags: ['Chest']
    }),
    getProject: builder.query({
      query: (id) => `project/${id}/`,
      providesTags: ['Project']
    }),
    updateProject: builder.mutation({
      query: (id, body) => ({
        url: `project/${id}/`,
        method: 'PATCH',
        body
      }),
      invalidatesTags: ['Project']
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
      query: (id, name) => ({
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
      invalidatesTags: ['Project']
    }),
    getTrash: builder.query({
      query: () => ''
    })
  })
});

export const { 
  useGetChestQuery,
  useGetProjectQuery,
  useUpdateProjectMutation,
  useCreateVersionMutation,
  useDeleteVersionMutation,
  useUpdateVersionMutation,
} = api;