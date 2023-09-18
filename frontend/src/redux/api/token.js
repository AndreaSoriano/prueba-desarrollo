import { baseApi } from "../api/index";

export const tokenApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    tokens: build.query({
      query: (params) => {
        return {
          url: `tokens`,
          params: params,
        };
      },
    }),
    generateToken: build.mutation({
      query: () => {
        return {
          url: `generate_tokens`,
          method: "POST",
        };
      },
    }),
    tokenUse: build.mutation({
      query: () => {
        return {
          url: `use_generated_token`,
          method: "POST",
        };
      },
    }),
  }),
});

export const {
  useTokensQuery,
  useGenerateTokenMutation,
  useTokenUseMutation,
} = tokenApi;
