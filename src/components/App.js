import React, {useState, useEffect} from 'react';
import RecipeList from './RecipeList';
import '../css/app.css';
import {v4 as uuidv4} from 'uuid';
import RecipeEdit from './RecipeEdit';

export const RecipeContext = React.createContext()
const LOCAL_STORAGE_KEY = 'cookingWithReact.recipes'

function App() {
  // take 'Recipes_initial' 當作初始 state
  const [recipes, setRecipes] = useState(Recipes_initial)
  // 一開始不take任何id, 要set state時再給id
  const [selectedRecipeId, setSelectedRecipeId] = useState()
  // set id state時, selectedRecipeId被更新, 找出和selectedRecipeId相符的recipe並觸發render
  const selectedRecipe = recipes.find(recipe => recipe.id === selectedRecipeId)

  useEffect(()=>{
    const recipeJSON = localStorage.getItem(LOCAL_STORAGE_KEY)
    if (recipeJSON != null) setRecipes(JSON.parse(recipeJSON))
  }, [])

  useEffect(()=>{
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(recipes))
  }, [recipes])
  
  // 用object pass data
  const recipeContextValue = {
    handleRecipeAdd: handleRecipeAdd,
    handleRecipeDelete: handleRecipeDelete,
    handleRecipeSelect: handleRecipeSelect,
    handleRecipeChange: handleRecipeChange
  }

  function handleRecipeSelect(id) {
    // 調用 set state, 並觸發render
    setSelectedRecipeId(id)
  }

  function handleRecipeAdd() {
    // 新recipe object
    const newRecipe = {
      id: uuidv4(),
      name: '',
      servings: 1,
      cookTime: '',
      instructions: '',
      ingredients: [
        {id: uuidv4(), name: '', amount: ''}
      ]
    }
    // 目的是調用set state並觸發render
    setSelectedRecipeId(newRecipe.id)
    // 在原本的state上加新的recipe object
    setRecipes([...recipes, newRecipe]);
  }

  function handleRecipeDelete(id) {
    // 是說如果目標id已存在就不render?
    if (selectedRecipeId != null && selectedRecipeId === id) {
      selectedRecipeId(undefined)
    }
    // return目標id之外的recipe, 相當於把目標id刪掉
    setRecipes(recipes.filter(recipe => recipe.id !== id))
  }

  function handleRecipeChange(id, recipe) {
    const newRecipes = [...recipes]
    const index = newRecipes.findIndex(r => r.id === id)
    newRecipes[index] = recipe
    // 複製初始state, 找到目標id在state array的位置, 以新的recipe替換掉, 達成修改
    setRecipes(newRecipes)
  }

  return (
    <RecipeContext.Provider value={recipeContextValue}>
      {/* props 傳state給RecipeList */}
      <RecipeList recipes={recipes} />
      {selectedRecipe && <RecipeEdit recipe={selectedRecipe} />}
    </RecipeContext.Provider>
    )
}

const Recipes_initial = [
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
