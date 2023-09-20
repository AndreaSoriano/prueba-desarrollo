import { baseApi } from "../api/index";

const tokenApi = baseApi.injectEndpoints({
  tagTypes: ["Token"],
  endpoints: (build) => ({
    tokens: build.query({
      providesTags: ["Token"],
      query: (params) => {
        return {
          url: `tokens`,
          params: params,
        };
      },
    }),
    generateToken: build.mutation({
      invalidatesTags: ["Token"],
      query: () => {
        return {
          url: `generate_tokens`,
          method: "POST",
        };
      },
    }),
    tokenUse: build.mutation({
      invalidatesTags: ["Token"],
      query: (body) => {
        return {
          url: `use_generated_token`,
          method: "POST",
          body,
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
