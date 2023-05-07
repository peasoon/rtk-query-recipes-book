import * as React from "react";
import {
  useAddRecipeMutation,
  useGetAllRecipesQuery,
} from "../store/API/recipesApi";
import { IRecipe } from "../types/recipe.interface";
import { useEffect } from "react";
import Recipe from "./Recipe";

interface IRecipesListProps {}

interface CustomElements extends HTMLFormControlsCollection {
  title: HTMLInputElement;
  img: HTMLInputElement;
  recipe: HTMLInputElement;
}
interface CustomForm extends HTMLFormElement {
  readonly elements: CustomElements;
}

const RecipesList: React.FunctionComponent<IRecipesListProps> = (props) => {
  const { data } = useGetAllRecipesQuery();
  const [addRecipe, result] = useAddRecipeMutation();
  const handleSubmit = (e: React.FormEvent<CustomForm>) => {
    e.preventDefault();
    const target = e.currentTarget.elements;
    const item:IRecipe = {
      id: data!.length+1,
      title: target.title.value,
      img: target.img.value,
      recipe: target.recipe.value,
      favorited:false
    }
    addRecipe(item).then(res=>alert('Recipe added')).catch(err=>alert('Error'))
  };
  useEffect(() => {
    console.log(data);
  }, [data]);
  return (
    <div className="recipes-list">
      <div className="add-recipe-form">
        <form
          onSubmit={(e: React.FormEvent<CustomForm>) => {
            handleSubmit(e);
          }}
        >
          <label>
            <span>Title</span>
            <input type="text" name="title" />
          </label>
          <label>
            <span>Image url</span>
            <input type="text" name="img" />
          </label>
          <label>
            <span>Recipe text</span>
            <input type="text" name="recipe" />
          </label>
          <button>Add</button>
        </form>
      </div>
      {data &&
        data.map((recipe: IRecipe) => <Recipe {...recipe} key={recipe.id} />)}
    </div>
  );
};

export default RecipesList;
