// RecipeList render兩個Component: Recipe和 Add Recipe btn
import React, {useContext} from 'react';
import Recipe from './Recipe';
import {RecipeContext} from './App';

// 接收props傳進來的recipes
export default function RecipeList({recipes}) {
  // Function: Add; 調用useContext 傳進來 handleRecipeAdd
  const { handleRecipeAdd} = useContext(RecipeContext)

  return (
    <div className="recipe-list">
      <div>
        {/* map找出個別recipe後pass給Recipe Component */}
        {recipes.map((recipe) => {
          return (
            // 每個Recipe component都需要獨特的key
          <Recipe key={recipe.id} {...recipe} />
          )
        })}
      </div>
      <div className="recipe-list__add-recipe-btn-container">
        <button 
          className="btn btn--primary"
          // 把handleRecipeAdd綁定到 click btn event
          onClick={handleRecipeAdd}
          >Add Recipe</button>
      </div>
    </div>
  );
}
