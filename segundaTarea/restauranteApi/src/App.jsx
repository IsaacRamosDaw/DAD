import { useState, useEffect } from 'react';
import MenuList from '../components/MenuList';
import MenuItem from '../components/MenuItem';
import './App.css'

function App() {
  const globalStyles = `
/* ------------------- BASE Y FUENTE ------------------- */
:root {
  --primary-color: #1d4ed8; /* Azul simple */
  --bg-color: #f8fafc; /* Gris muy claro */
  --card-bg: #ffffff;
  --text-dark: #1e293b;
  --text-light: #64748b;
}

body {
  margin: 0;
  font-family: 'Inter', sans-serif;
  background-color: var(--bg-color);
  color: var(--text-dark);
  scroll-behavior: smooth; /* Para el scroll nativo */
}

.app-container {
  min-height: 100vh;
}

/* ------------------- HEADER ------------------- */
.app-header {
  background-color: var(--primary-color);
  color: var(--card-bg);
  padding: 1rem 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.header-title {
  font-size: 2rem;
  font-weight: 700;
  text-align: center;
}

/* ------------------- MAIN LAYOUT ------------------- */
.main-content {
  width: 95%;
  max-width: 1200px;
  margin: 1.5rem auto;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

/* Responsive layout: Sidebar y Contenido en paralelo para escritorio */
@media (min-width: 1024px) {
  .main-content {
    flex-direction: row;
    align-items: flex-start; /* Para que la sidebar no se estire */
  }
}

/* ------------------- SIDEBAR (MenuList) ------------------- */
.menu-sidebar {
  width: 100%;
  background-color: var(--card-bg);
  padding: 0.5rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  box-sizing: border-box;
}

@media (min-width: 1024px) {
  .menu-sidebar {
    width: 250px; 
    flex-shrink: 0; /* No encoger en desktop */
    position: sticky; /* Sticky para mejor navegación */
    top: 1.5rem;
  }
}

.menu-nav {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.menu-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--text-dark);
  margin-bottom: 0.5rem;
}

.category-button {
  width: 100%;
  text-align: left;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  transition: background-color 0.2s;
  border: none;
  cursor: pointer;
  background-color: #f1f5f9; /* Gris claro */
  color: var(--text-dark);
  font-weight: 500;
}

.category-button:hover {
  background-color: #e2e8f0; 
}

/* ------------------- FOOD ITEMS SECTION ------------------- */
.food-main-section {
  width: 100%;
  flex-grow: 1; /* Ocupar el espacio restante en desktop */
}

.category-section {
    margin-bottom: 3rem; /* Espaciado entre categorías */
    padding-top: 2rem; /* Buffer superior para el scroll */
    /* El margin-top negativo compensa el padding-top */
    margin-top: -2rem; 
}

.section-title {
  font-size: 2rem;
  font-weight: 700;
  color: var(--primary-color);
  margin-bottom: 1.5rem;
  border-bottom: 2px solid #e2e8f0;
  padding-bottom: 0.5rem;
}

.food-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
}

/* ------------------- FOOD CARD (MenuItem) ------------------- */
.food-card {
  background-color: var(--card-bg);
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  transition: transform 0.3s;
}

.food-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 10px rgba(0, 0, 0, 0.1);
}

.food-image {
  width: 100%;
  height: 200px; 
  object-fit: cover;
}

.food-card-content {
  padding: 1rem;
}

.food-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--text-dark);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* ------------------- LOADING / EMPTY STATES ------------------- */
.loading-indicator {
  text-align: center;
  padding: 3rem;
  color: var(--text-light);
}

.spinner {
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-top: 4px solid var(--primary-color);
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
  margin: 0 auto 1rem;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
`;
  const [categories, setCategories] = useState([]);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const CATEGORIESAPI = "https://www.themealdb.com/api/json/v1/1/categories.php";
  const FILTER_FOOD_API = "https://www.themealdb.com/api/json/v1/1/filter.php?c=";

  // --- Efecto 1: Obtener Categorías ---
  useEffect(() => {
    const obtenerCategorias = async () => {
      try {
        const resLista = await fetch(CATEGORIESAPI);
        const dataList = await resLista.json();
        setCategories(dataList.categories || []);
      } catch (err) {
        console.error("Error al obtener categorías:", err);
      }
    };
    obtenerCategorias();
  }, []);

  // --- Efecto 2: Obtener Comidas por Categoría (al cargar) ---
  useEffect(() => {
    if (categories.length === 0) return;

    const obtenerComidas = async () => {
      setLoading(true);
      try {
        const categoriesFetch = categories.map(async (cat) => {
          const categoryName = cat.strCategory;
          const categorieApi = `${FILTER_FOOD_API}${categoryName}`;
          const res = await fetch(categorieApi);
          const foodData = await res.json();
          const meals = foodData.meals || [];

          const formattedFood = meals.map(meal => ({
            idFood: meal.idMeal,
            foodName: meal.strMeal,
            foodThumbnail: meal.strMealThumb,
          }));

          return {
            idCategory: cat.idCategory,
            nameCategory: categoryName,
            food: formattedFood,
          };
        });

        const completeData = await Promise.all(categoriesFetch);
        setData(completeData);

      } catch (e) {
        console.error("Error al procesar datos de comida:", e);
      } finally {
        setLoading(false);
      }
    };
    obtenerComidas();
  }, [categories]);

  // --- Handler para el Scroll ---
  const handleCategoryClick = (categoryName) => {
    // Crea un ID seguro: reemplaza espacios por guiones y usa minúsculas
    const targetId = `category-${categoryName.toLowerCase().replace(/\s/g, '-')}`;
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      // Usa scrollIntoView para desplazar la vista suavemente
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      console.warn(`Elemento con ID ${targetId} no encontrado.`);
    }
  };

  return (
    <div className="app-container">
      {/* Inyección de estilos para que el CSS funcione sin errores de importación */}
      <style dangerouslySetInnerHTML={{ __html: globalStyles }} />

      <header className="app-header">
        <h1 className="header-title">
          Menú Restaurante
        </h1>
      </header>

      <main className="main-content">

        {/* === Sidebar de Categorías (MenuList) === */}
        <aside id='menu-list' className="menu-sidebar">
          <MenuList
            categories={data}
            onCategorySelect={handleCategoryClick} // Pasamos la función de scroll
          />
        </aside>

        {/* === Contenido Principal de Comidas (TODAS las secciones) === */}
        <section id='food' className="food-main-section">
          {loading ? (
            <div className="loading-indicator">
              <div className="spinner"></div>
              Cargando el menú...
            </div>
          ) : (
            data.map((categoryData) => (
              // Cada categoría es un target de scroll con un ID único
              <div
                key={categoryData.idCategory}
                id={`category-${categoryData.nameCategory.toLowerCase().replace(/\s/g, '-')}`}
                className="category-section"
              >
                <h2 className="section-title">
                  {categoryData.nameCategory}
                </h2>

                <div className="food-grid">
                  {categoryData.food.length > 0 ? (
                    categoryData.food.map((food) => (
                      <MenuItem
                        key={food.idFood}
                        name={food.foodName}
                        thumbnail={food.foodThumbnail}
                      />
                    ))
                  ) : (
                    <p className="food-card-content" style={{ color: 'var(--text-light)' }}>
                      No hay platos disponibles en esta sub-categoría.
                    </p>
                  )}
                </div>
              </div>
            ))
          )}
        </section>
      </main>
    </div>
  );
}

export default App
