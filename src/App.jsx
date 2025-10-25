import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./index.css";

function SearchBar({ search, setSearch }) {
  return (
    <nav className="navbar">
      <h1>🍲 Recipe Finder</h1>
      <div className="nav-buttons">
        <Link to="/">🏠 Home</Link>
        <Link to="/recipes">📖 All Recipes</Link>
        <Link to="/add">➕ Add Recipe</Link>
      </div>
      <input
        type="text"
        placeholder="Search recipes..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </nav>
  );
}

function AddRecipeForm({ newRecipe, setNewRecipe, handleAdd, editId }) {
  return (
    <div className="form">
      <input
        type="text"
        placeholder="Recipe name"
        value={newRecipe.name}
        onChange={(e) => setNewRecipe({ ...newRecipe, name: e.target.value })}
      />
      <textarea
        placeholder="Ingredients (comma separated)"
        value={newRecipe.ingredients}
        onChange={(e) =>
          setNewRecipe({ ...newRecipe, ingredients: e.target.value })
        }
      />
      <input
        type="text"
        placeholder="Image URL"
        value={newRecipe.image || ""}
        onChange={(e) => setNewRecipe({ ...newRecipe, image: e.target.value })}
      />
      <button onClick={handleAdd}>
        {editId ? "💾 Update Recipe" : "➕ Add Recipe"}
      </button>
    </div>
  );
}

function RecipesList({ recipes, handleEdit, handleDelete, search }) {
  const filteredRecipes = recipes.filter((r) =>
    r.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="recipe-list">
      {filteredRecipes.length > 0 ? (
        filteredRecipes.map((recipe) => (
          <div className="recipe-card" key={recipe.id}>
            {recipe.image && <img src={recipe.image} alt={recipe.name} />}
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
  );
}

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
            image: "",
          },
          {
            id: 2,
            name: "Pancakes",
            ingredients: "Flour, Milk, Eggs, Syrup",
            image: "",
          },
        ];
  });

  const [search, setSearch] = useState("");
  const [newRecipe, setNewRecipe] = useState({ name: "", ingredients: "", image: "" });
  const [editId, setEditId] = useState(null);

  // Separate state for Add page recipes
  const [addPageRecipes, setAddPageRecipes] = useState([]);

  useEffect(() => {
    localStorage.setItem("recipes", JSON.stringify(recipes));
  }, [recipes]);

  const handleAdd = (isAddPage = false) => {
    if (!newRecipe.name.trim() || !newRecipe.ingredients.trim()) return;

    const recipe = { id: Date.now(), ...newRecipe };

    if (editId) {
      // Edit affects both states
      setRecipes(recipes.map((r) => (r.id === editId ? { ...r, ...newRecipe } : r)));
      setAddPageRecipes(addPageRecipes.map((r) => (r.id === editId ? { ...r, ...newRecipe } : r)));
      setEditId(null);
    } else {
      setRecipes([...recipes, recipe]);
      if (isAddPage) setAddPageRecipes([...addPageRecipes, recipe]);
    }

    setNewRecipe({ name: "", ingredients: "", image: "" });
  };

  const handleDelete = (id) => {
    setRecipes(recipes.filter((r) => r.id !== id));
    setAddPageRecipes(addPageRecipes.filter((r) => r.id !== id));
  };

  const handleEdit = (recipe, isAddPage = false) => {
    setEditId(recipe.id);
    setNewRecipe({ name: recipe.name, ingredients: recipe.ingredients, image: recipe.image || "" });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Router>
      <div className="App">
        <SearchBar search={search} setSearch={setSearch} />

        <Routes>
          {/* Main Page */}
          <Route
            path="/"
            element={
              <>
                <header className="hero">
                  <h2>Welcome to Your Kitchen!</h2>
                  <p>Find, add, and edit your favorite recipes 🍅</p>
                </header>
                <div className="main-container">
                  <div className="form-container">
                    <AddRecipeForm
                      newRecipe={newRecipe}
                      setNewRecipe={setNewRecipe}
                      handleAdd={() => handleAdd(false)}
                      editId={editId}
                    />
                  </div>
                  <div className="recipes-container">
                    <RecipesList
                      recipes={recipes}
                      handleEdit={handleEdit}
                      handleDelete={handleDelete}
                      search={search}
                    />
                  </div>
                </div>
              </>
            }
          />

          {/* All Recipes Page */}
          <Route
            path="/recipes"
            element={
              <RecipesList
                recipes={recipes}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
                search={search}
              />
            }
          />

          {/* Add Recipe Page */}
          <Route
            path="/add"
            element={
              <div className="main-container">
                <div className="form-container">
                  <AddRecipeForm
                    newRecipe={newRecipe}
                    setNewRecipe={setNewRecipe}
                    handleAdd={() => handleAdd(true)} // Only add to addPageRecipes
                    editId={editId}
                  />
                </div>
                <div className="recipes-container">
                  <RecipesList
                    recipes={addPageRecipes} // Only show newly added recipes
                    handleEdit={(r) => handleEdit(r, true)}
                    handleDelete={handleDelete}
                    search={search}
                  />
                </div>
              </div>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
