import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RootState } from "../app/store";

const apiBaseUrl = `${import.meta.env.VITE_API_BASE_URL}/api`;

export type AdminLoginRequest = {
  number: number;
  password: string;
};

export type AdminLoginResponse = {
  ok: boolean;
  token?: string;
  error?: string;
};

export type SalonApiItem = {
  _id: string;
  salonId: string;
  salonName: string;
  contactNumber: string;
  createdAt: string;
  updatedAt: string;
  images?: string[];
  status?: string;
  address?: {
    line1?: string;
    city?: string;
    state?: string;
    pincode?: string;
  };
  businessHours?: Record<string, { open?: string; close?: string }>;
};

export type AdminSalonsResponse = {
  ok: boolean;
  salons: SalonApiItem[];
  counts: {
    total: number;
    active: number;
    inactive: number;
    deleted: number;
    other: number;
  };
  filters: {
    status: string | null;
  };
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
};

export type GetAdminSalonsParams = {
  page: number;
  limit: number;
  status?: string;
  search?: string;
};

export type CustomerApiItem = {
  _id: string;
  customerId?: string;
  userId?: string;
  name?: string;
  fullName?: string;
  auth?: {
    phone?: string;
    email?: string;
  };
  profile?: {
    fullName?: string;
    gender?: string;
    profileImageUrl?: string;
  };
  preferences?: {
    preferredStylistGender?: string;
  };
  system?: {
    isProfileComplete?: boolean;
    createdAt?: string;
    updatedAt?: string;
  };
  status?:
    | string
    | {
        active?: boolean;
        blocked?: boolean;
        deletedAt?: string | null;
      };
  phone?: string;
  number?: string | number;
  email?: string;
  gender?: string;
  preferredStylist?: string;
  stylistPreference?: string;
  address?: {
    city?: string;
    state?: string;
  };
  city?: string;
  state?: string;
  createdAt: string;
  updatedAt: string;
};

export type AdminCustomersResponse = {
  ok: boolean;
  customers: CustomerApiItem[];
  counts?: {
    total?: number;
    active?: number;
    blocked?: number;
    deleted?: number;
  };
  filters?: {
    status?: string | null;
    search?: string | null;
  };
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
};

export type GetAdminCustomersParams = {
  page: number;
  limit: number;
  status?: string;
  search?: string;
};

export const adminApi = createApi({
  reducerPath: "adminApi",
  baseQuery: fetchBaseQuery({
    baseUrl: apiBaseUrl,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  endpoints: (builder) => ({
    loginAdmin: builder.mutation<AdminLoginResponse, AdminLoginRequest>({
      query: (body) => ({
        url: "/admin/login",
        method: "POST",
        body,
      }),
    }),
    getAdminSalons: builder.query<AdminSalonsResponse, GetAdminSalonsParams>({
      query: ({ page, limit, status, search }) => ({
        url: "/admin/salons",
        params: {
          page,
          limit,
          ...(status ? { status } : {}),
          ...(search ? { search } : {}),
        },
      }),
    }),
    getAdminCustomers: builder.query<
      AdminCustomersResponse,
      GetAdminCustomersParams
    >({
      query: ({ page, limit, status, search }) => ({
        url: "/admin/customers",
        params: {
          page,
          limit,
          ...(status ? { status } : {}),
          ...(search ? { search } : {}),
        },
      }),
    }),
  }),
});

export const {
  useGetAdminCustomersQuery,
  useGetAdminSalonsQuery,
  useLoginAdminMutation,
} = adminApi;
