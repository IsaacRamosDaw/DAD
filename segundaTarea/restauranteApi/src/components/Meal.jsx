import { useParams } from "react-router-dom"
import { useState, useEffect } from "react";
import './Meal.css'

function Meal() {
  const id = useParams().id
  const mealInfoApi = "https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + id

  const [data, setData] = useState({});
  const [ingredients, setIngredients] = useState([])

  useEffect(() => {
    const obtenerDatos = async () => {
      try {
        const question = await fetch(mealInfoApi);
        const res = await question.json();
        setData(res.meals[0]);
      } catch (err) {
        console.error("Error al obtener categorías:", err);
      }
    };
    obtenerDatos();
  }, [id]);

  useEffect(() => {
    const processedIngredients = [];
    for (let i = 1; i <= 20; i++) {
      const ingredientName = data[`strIngredient${i}`];

      if (ingredientName && ingredientName.trim()) {
        processedIngredients.push({
          name: ingredientName.trim(),
        });
      }
    }
    setIngredients(processedIngredients);
  }, [data]);

  console.log(data);

  return (
    <div className="meal-container">
      <img src={data.strMealThumb} alt="" />
      <h2>{data.strMeal}</h2>
      <p>{data.strInstructions}</p>
      <ul>
        {ingredients.map((ingredient, index) => (
          <li key={index}>
            {ingredient.name}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Meal