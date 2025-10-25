function RecipesList({ recipes = [], handleEdit, handleDelete, search = "" }) {
  const filteredRecipes = recipes.filter((r) =>
    r.name.toLowerCase().includes(search.toLowerCase())
  );

  if (filteredRecipes.length === 0) {
    return <p className="no-results">No recipes found 🍽️</p>;
  }

  return (
    <div className="recipe-list">
      {filteredRecipes.map((recipe) => (
        <div className="recipe-card" key={recipe.id}>
          <div className="card-content">
            <h2>{recipe.name}</h2>
            <p>{recipe.ingredients}</p>
            <div className="actions">
              <button onClick={() => handleEdit(recipe)}>✏️ Edit</button>
              <button onClick={() => handleDelete(recipe.id)}>🗑️ Delete</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default RecipesList;
