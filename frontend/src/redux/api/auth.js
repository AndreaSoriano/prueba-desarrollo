import { baseApi } from "../api/index";

const authApi = baseApi.injectEndpoints({
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
    logout: build.mutation({
      query: () => {
        return {
          url: `logout`,
          method: "POST",
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

export const {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
} = authApi;
