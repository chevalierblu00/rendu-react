import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const articleAPI = createApi({
  reducerPath: 'articleAPI',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://iim.etherial.fr' }),
  endpoints: (builder) => ({
    getArticles: builder.query({
      query: () => `products`,
    }),
    createArticle: builder.mutation({
      query: (data) => ({
        url: '/products',
        method: 'POST',
        body: data,
      }),
    }),
    createComment: builder.mutation({
      query: ({ id, username, comment }) => ({
        url: `/products/${id}/comments`,
        method: 'POST',
        body: { id, username, comment },
      }),
    }),
    getComments: builder.query({
      query: (id) => `/products/${id}/comments`,
    }),
  }),
});

export const {
  useGetArticlesQuery,
  useCreateArticleMutation,
  useCreateCommentMutation,
  useGetCommentsQuery,
} = articleAPI;
export default articleAPI;
