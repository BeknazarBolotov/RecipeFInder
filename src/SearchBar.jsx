function SearchBar({ search, setSearch }) {
  return (
    <nav className="navbar">
      <h1>🍲 Recipe Finder</h1>
      <input
        type="text"
        placeholder="Search recipes..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </nav>
  );
}

export default SearchBar;
