import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { IRecipe } from "./../../types/recipe.interface.ts";

interface IPatchFRavorited {
  id: number;
  isAdded: boolean;
}

// Define a service using a base URL and expected endpoints
export const recipesApi = createApi({
  reducerPath: "recipesApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3004" }),
  tagTypes: ["Recipe"],
  endpoints: (builder) => ({
    getAllRecipes: builder.query<IRecipe[], void>({
      query: () => `/recipes`,
      providesTags: (result, error, arg) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Recipe" as const, id })),
              "Recipe",
            ]
          : ["Recipe"],
    }),
    addRecipe: builder.mutation<void, IRecipe>({
      query: (recipe) => ({
        url: `/recipes`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: recipe,
      }),
      invalidatesTags: ["Recipe"],
    }),
    toggleFavorited: builder.mutation<void, IPatchFRavorited>({
      query: ({id, isAdded}) => ({
        url: `/recipes/${id}`,
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: { favorited: isAdded },
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'Recipe', id:arg.id }],
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetAllRecipesQuery, useAddRecipeMutation, useToggleFavoritedMutation } = recipesApi;
