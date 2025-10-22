import { useState, useEffect } from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import MenuList from './MenuList';
import MenuItem from './MenuItem';

function Home(){

    const [categories, setCategories] = useState([]);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const CATEGORIESAPI = "https://www.themealdb.com/api/json/v1/1/categories.php";
  const FOODCATEGORYAPI = "https://www.themealdb.com/api/json/v1/1/filter.php?c=";

  useEffect(() => {
    const obtenerCategorias = async () => {
      try {
        const question = await fetch(CATEGORIESAPI);
        const res = await question.json();
        setCategories(res.categories);
      } catch (err) {
        console.error("Error al obtener categorías:", err);
      }
    };
    obtenerCategorias();
  }, []);

  useEffect(() => {
    const obtenerComidas = async () => {
      setLoading(true);
      try {
        const categoriesFetch = categories.map(async (cat) => {
          const categoryName = cat.strCategory;
          const categoryApi = `${FOODCATEGORYAPI}${categoryName}`;
          const question = await fetch(categoryApi);
          const res = await question.json();
          const meals = res.meals;

          const formattedFood = meals.map(meal => ({
            idFood: meal.idMeal,
            foodName: meal.strMeal,
            foodThumbnail: meal.strMealThumb,
          }));

          console.log(formattedFood)

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

  const handleCategoryClick = (categoryName) => {
    const targetId = `category-${categoryName.toLowerCase().replace(/\s/g, '-')}`;
    const targetElement = document.getElementById(targetId);

    if (targetElement) 
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    else 
      console.warn(`Elemento con ID ${targetId} no encontrado.`);
  };

return(
      <div className="app-container">

      <header className="app-header">
        <h1 className="header-title">
          Menú Restaurante
        </h1>
      </header>

      <main className="main-content">

        <aside id='menu-list' className="menu-sidebar">
          <MenuList
            categories={data}
            onCategorySelect={handleCategoryClick}
          />
        </aside>

        <section id='food' className="food-main-section">
          {loading ? 
          (
            <div className="loading-indicator">
              <div className="spinner"></div>
              <p>Cargando el menú...</p>
            </div>
          ) 
          : 
          (
            data.map((categoryData) => (
              <div
                key={categoryData.idCategory}
                id={`category-${categoryData.nameCategory.toLowerCase()}`}
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
                        id={food.idFood}
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
)
}

export default Home