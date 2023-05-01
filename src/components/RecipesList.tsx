import * as React from "react";
import { useGetAllRecipesQuery } from "../store/API/recipesApi";
import { IRecipe } from "../types/recipe.interface";
import { useEffect } from "react";

interface IRecipesListProps {}

const RecipesList: React.FunctionComponent<IRecipesListProps> = (props) => {
  const { data } = useGetAllRecipesQuery();
  useEffect(() => {
    console.log(data);
  }, [data]);
  return (
    <div className="recipes-list">
      {data &&
        data.map((recipe: IRecipe) => (
          <p key={recipe.id}>{JSON.stringify(recipe)}</p>
        ))}
    </div>
  );
};

export default RecipesList;
