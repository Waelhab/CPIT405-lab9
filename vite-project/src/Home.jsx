import React, { useState, useEffect } from "react";

const Home = () => {
  const [query, setQuery] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [error, setError] = useState("");

  const apiKey = "07729340e3af4205bbaa5a48f53697c4";

  const searchRecipes = async () => {
    if (!query) {
      setError("Please enter a search term.");
      return;
    }
    setError("");
    try {
      const response = await fetch(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&query=${query}`
      );
      const data = await response.json();
      if (data.results) {
        setRecipes(data.results);
      } else {
        setRecipes([]);
      }
    } catch (err) {
      setError("Failed to fetch recipes. Please try again.");
    }
  };

  const fetchRecipeDetails = async (id) => {
    try {
      const response = await fetch(
        `https://api.spoonacular.com/recipes/${id}/information?apiKey=${apiKey}`
      );
      const data = await response.json();
      setSelectedRecipe(data);
    } catch (err) {
      setError("Failed to fetch recipe details. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Recipe Finder</h1>

      <div className="flex items-center space-x-4 mb-6">
        <input
          type="text"
          placeholder="Search for a recipe..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="px-4 py-2 w-80 border border-gray-300 rounded-md"
        />
        <button
          onClick={searchRecipes}
          className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
        >
          Search
        </button>
      </div>
      {error && <p className="text-red-500">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-5xl">
        {recipes.map((recipe) => (
          <div
            key={recipe.id}
            className="border rounded-md p-4 shadow-sm bg-white"
            onClick={() => fetchRecipeDetails(recipe.id)}
          >
            <img
              src={recipe.image}
              alt={recipe.title}
              className="w-full h-40 object-cover rounded-md mb-2"
            />
            <h2 className="text-lg font-semibold">{recipe.title}</h2>
          </div>
        ))}
      </div>

      {selectedRecipe && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="bg-white p-6 rounded-md shadow-lg max-w-lg w-full">
            <button
              onClick={() => setSelectedRecipe(null)}
              className="absolute top-2 right-2 text-gray-500 hover:text-black"
            >
              ✕
            </button>
            <h2 className="text-2xl font-bold mb-4">{selectedRecipe.title}</h2>
            <img
              src={selectedRecipe.image}
              alt={selectedRecipe.title}
              className="w-full h-60 object-cover rounded-md mb-4"
            />
            <h3 className="text-xl font-semibold">Ingredients</h3>
            <ul className="list-disc list-inside mb-4">
              {selectedRecipe.extendedIngredients.map((ingredient) => (
                <li key={ingredient.id}>{ingredient.original}</li>
              ))}
            </ul>
            <h3 className="text-xl font-semibold">Instructions</h3>
            <p>{selectedRecipe.instructions || "No instructions provided."}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
