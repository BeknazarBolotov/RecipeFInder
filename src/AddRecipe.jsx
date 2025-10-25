function AddRecipe({ newRecipe, setNewRecipe, handleAdd, editId }) {
  return (
    <div className="form">
      <input
        type="text"
        placeholder="Recipe Name"
        value={newRecipe.name}
        onChange={(e) => setNewRecipe({ ...newRecipe, name: e.target.value })}
      />

      <textarea
        placeholder="Ingredients (comma separated)"
        value={newRecipe.ingredients}
        onChange={(e) =>
          setNewRecipe({ ...newRecipe, ingredients: e.target.value })
        }
        className="ingredients-textarea"
      />

      <button onClick={handleAdd}>{editId ? "Update Recipe" : "Add Recipe"}</button>
    </div>
  );
}

export default AddRecipe;