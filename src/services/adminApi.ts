import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export type AdminLoginRequest = {
  number: number;
  password: string;
};

export type AdminLoginResponse = {
  ok: boolean;
  token?: string;
  error?: string;
};

export const adminApi = createApi({
  reducerPath: 'adminApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3000/api',
  }),
  endpoints: (builder) => ({
    loginAdmin: builder.mutation<AdminLoginResponse, AdminLoginRequest>({
      query: (body) => ({
        url: '/admin/login',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const { useLoginAdminMutation } = adminApi;