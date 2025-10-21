function MenuList({ categories, onCategorySelect }) {
  return (
    <nav className="menu-nav">
      <h2 className="menu-title">Categorías</h2>
      {categories.map((category) => (
          <button
            type="button"
            className="category-button"
            key={category.idCategory}
            // Llama a la función de scroll con el nombre de la categoría
            onClick={() => onCategorySelect(category.nameCategory)}
          >
            {category.nameCategory}
          </button>
      ))}
    </nav>
  );
}

export default MenuList