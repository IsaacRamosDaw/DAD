import { useParams } from "react-router-dom"
import { useState, useEffect } from "react";
function Meal(){
  const id = useParams().id
  const mealInfoApi = "https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + id

  const [data, setData] = useState({});

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

  console.log(data)

  return(
    <div>
      <img src={data.strMealThumb} alt="" />
      <h2>{data.strMeal}</h2>
      <p>{data.strInstructions}</p>

      <ul>
        {
          for (let i = 0; i < 20; i++) {
            const element = array[i];
            
          }
        }
      </ul>
    </div>
  )
}

export default Meal