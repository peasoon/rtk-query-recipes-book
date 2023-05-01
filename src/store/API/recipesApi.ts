import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { IRecipe } from './../../types/recipe.interface.ts'

// Define a service using a base URL and expected endpoints
export const recipesApi = createApi({
  reducerPath: 'recipesApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3004' }),
  tagTypes:['Recipe'],
  endpoints: (builder) => ({
    getAllRecipes: builder.query<IRecipe[], void>({
      query: () => `/recipes`,
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {useGetAllRecipesQuery } = recipesApi