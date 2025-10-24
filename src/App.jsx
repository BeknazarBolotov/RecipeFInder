import { useState, useEffect } from "react";
import "./index.css";

function App() {
  const [recipes, setRecipes] = useState(() => {
    const saved = localStorage.getItem("recipes");
    return saved
      ? JSON.parse(saved)
      : [
          {
            id: 1,
            name: "Spaghetti Bolognese",
            ingredients: "Pasta, Tomato, Beef, Cheese",
          },
          {
            id: 2,
            name: "Pancakes",
            ingredients: "Flour, Milk, Eggs, Syrup",
          },
        ];
  });

  const [search, setSearch] = useState("");
  const [newRecipe, setNewRecipe] = useState({ name: "", ingredients: "" });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    localStorage.setItem("recipes", JSON.stringify(recipes));
  }, [recipes]);

  const handleAdd = () => {
    if (!newRecipe.name.trim() || !newRecipe.ingredients.trim()) return;

    if (editId) {
      setRecipes(
        recipes.map((r) =>
          r.id === editId ? { ...r, ...newRecipe } : r
        )
      );
      setEditId(null);
    } else {
      setRecipes([
        ...recipes,
        {
          id: Date.now(),
          name: newRecipe.name,
          ingredients: newRecipe.ingredients,
        },
      ]);
    }

    setNewRecipe({ name: "", ingredients: "" });
  };

  const handleDelete = (id) => {
    setRecipes(recipes.filter((r) => r.id !== id));
  };

  const handleEdit = (recipe) => {
    setEditId(recipe.id);
    setNewRecipe({ name: recipe.name, ingredients: recipe.ingredients });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const filteredRecipes = recipes.filter((r) =>
    r.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="App">
      <nav className="navbar">
        <h1>🍲 Recipe Finder</h1>
        <input
          type="text"
          placeholder="Search recipes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </nav>

      <header className="hero">
        <h2>Welcome to Your Kitchen!</h2>
        <p>Find, add, and edit your favorite recipes 🍅</p>
      </header>

      <div className="form">
        <input
          type="text"
          placeholder="Recipe name"
          value={newRecipe.name}
          onChange={(e) => setNewRecipe({ ...newRecipe, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Ingredients (comma separated)"
          value={newRecipe.ingredients}
          onChange={(e) =>
            setNewRecipe({ ...newRecipe, ingredients: e.target.value })
          }
        />
        <button onClick={handleAdd}>
          {editId ? "💾 Update Recipe" : "➕ Add Recipe"}
        </button>
      </div>

      <div className="recipe-list">
        {filteredRecipes.length > 0 ? (
          filteredRecipes.map((recipe) => (
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
          ))
        ) : (
          <p className="no-results">No recipes found 🍽️</p>
        )}
      </div>
    </div>
  );
}

export default App;