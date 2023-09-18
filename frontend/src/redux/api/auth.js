import { baseApi } from "../api/index";

export const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation({
      query: (body) => {
        return {
          url: `login`,
          method: "POST",
          body,
        };
      },
    }),
    register: build.mutation({
      query: (body) => {
        return {
          url: `register`,
          method: "POST",
          body,
        };
      },
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation } = authApi;
