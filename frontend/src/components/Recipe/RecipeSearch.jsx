import React, { useState } from "react";
import axios from "axios";

const RecipeSearch = () => {
  const [dietPreferences, setDietPreferences] = useState("");
  const [recipes, setRecipes] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/api/users/get-recipe-recommendations", {
        dietPreferences,
      });
      setRecipes(response.data);
    } catch (error) {
      console.error("Error fetching recipes:", error.response?.data || error.message);
      alert("Failed to fetch recipes. Please try again.");
    }
  };

  return (
    <div>
      <h2>Recipe Search</h2>
      <form onSubmit={handleSearch}>
        <div>
          <label>Diet Preferences:</label>
          <input
            type="text"
            value={dietPreferences}
            onChange={(e) => setDietPreferences(e.target.value)}
            placeholder="e.g., vegan, keto"
            required
          />
        </div>
        <button type="submit">Search Recipes</button>
      </form>

      {recipes.length > 0 && (
        <div>
          <h3>Recipe Results:</h3>
          <ul>
            {recipes.map((recipe) => (
              <li key={recipe.id}>
                <h4>{recipe.title}</h4>
                <img src={recipe.image} alt={recipe.title} width="200" />
                <p>Ingredients:</p>
                <ul>
                  {recipe.ingredients.map((ingredient, index) => (
                    <li key={index}>{ingredient.original}</li>
                  ))}
                </ul>
                <p>
                  <strong>Instructions:</strong> {recipe.instructions || "Not Available"}
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default RecipeSearch;
