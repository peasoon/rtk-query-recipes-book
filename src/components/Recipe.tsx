import * as React from "react";
import { IRecipe } from "../types/recipe.interface";
import { ReactComponent as Heart } from "./../assets/heart.svg";
import { useToggleFavoritedMutation } from "../store/API/recipesApi";

interface IRecipeProps {}

const Recipe: React.FunctionComponent<IRecipe> = ({
  title,
  img,
  recipe,
  favorited,
  id,
}) => {
  const [toggleFavorited, result] = useToggleFavoritedMutation();
  return (
    <div className="recipe">
      <div className="recipe-image">
        <img src={img} alt="image" />
      </div>
      <div className="recipe-title">{title}</div>
      <div className="recipe-description">{recipe}</div>
      <div
        className="recipe-in-favorites"
        style={{color:favorited?'red':'black'}}
        onClick={() => {
          toggleFavorited({ id: id, isAdded: !favorited });
        }}
      >
        <Heart />
      </div>
    </div>
  );
};

export default Recipe;
