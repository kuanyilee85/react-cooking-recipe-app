import React, {useState, useEffect} from 'react';
import RecipeList from './RecipeList';
import '../css/app.css';
import {v4 as uuidv4} from 'uuid';
import RecipeEdit from './RecipeEdit';

export const RecipeContext = React.createContext()
const LOCAL_STORAGE_KEY = 'cookingWithReact.recipes'

function App() {
  const [selectedRecipeId, setSelectedRecipeId] = useState()
  const [recipes, setRecipes] = useState(sampleRecipes)
  const selectedRecipe = recipes.find(recipe => recipe.id === selectedRecipeId)

  useEffect(()=>{
    const recipeJSON = localStorage.getItem(LOCAL_STORAGE_KEY)
    if (recipeJSON != null) setRecipes(JSON.parse(recipeJSON))
  }, [])

  useEffect(()=>{
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(recipes))
  }, [recipes])
  
  const recipeContextValue = {
    handleRecipeAdd: handleRecipeAdd,
    handleRecipeDelete: handleRecipeDelete,
    handleRecipeSelect: handleRecipeSelect,
  }

  function handleRecipeSelect(id) {
    setSelectedRecipeId(id)
  }

  function handleRecipeAdd() {
    const newRecipe = {
      id: uuidv4(),
      name: 'New',
      servings: 1,
      cookTime: '1:00',
      instructions: 'Instr.',
      ingredients: [
        {id: uuidv4, name: 'Name', amount: '1 Tbs'}
      ]
    }
  
    setRecipes([...recipes, newRecipe]);
  }

  function handleRecipeDelete(id) {
    setRecipes(recipes.filter(recipe => recipe.id !== id))
  }

  return (
    <RecipeContext.Provider value={recipeContextValue}>
      <RecipeList recipes={recipes} />
      {selectedRecipe && <RecipeEdit recipe={selectedRecipe} />}
    </RecipeContext.Provider>
    )
}

const sampleRecipes = [
  {
    id: 1,
    name: 'Plain Chicken',
    cookTime: '1:45',
    servings: 3,
    instructions:
      '1. Put Salt on chicken\n2. Put chicken in oven\n3. Eat chicken',
    ingredients: [
      {
        id: 1,
        name: 'chicken',
        amount: '2 pounds',
      },
      {
        id: 2,
        name: 'salt',
        amount: '3tbs',
      },
    ],
  },
  {
    id: 2,
    name: 'Plain Pork',
    cookTime: '10:45',
    servings: 2,
    instructions: '1. Put Papaya on pork\n2. Put pork in oven\n3. Eat pork',
    ingredients: [
      {
        id: 1,
        name: 'pork',
        amount: '5 pounds',
      },
      {
        id: 2,
        name: 'pepper',
        amount: '4tbs',
      },
    ],
  },
];

export default App;
