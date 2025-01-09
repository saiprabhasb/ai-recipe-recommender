import React from "react";

const RecipeDetails = ({ recipe }) => {
  if (!recipe) {
    return <div>No recipe details available.</div>;
  }

  return (
    <div>
      <h2>{recipe.title}</h2>
      <img src={recipe.image} alt={recipe.title} width="300" />
      <p>
        <strong>Summary:</strong> {recipe.summary ? recipe.summary.replace(/<[^>]+>/g, "") : "No summary available"}
      </p>
      <p>
        <strong>Ingredients:</strong>
      </p>
      <ul>
        {recipe.ingredients &&
          recipe.ingredients.map((ingredient, index) => (
            <li key={index}>{ingredient.original}</li>
          ))}
      </ul>
      <p>
        <strong>Instructions:</strong> {recipe.instructions || "Instructions not available"}
      </p>
    </div>
  );
};

export default RecipeDetails;
