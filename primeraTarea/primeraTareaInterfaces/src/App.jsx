import { useState, useEffect } from 'react';
import './App.css';
import PokemonCard from './PokemonCard';

function App() {
  const [pokemonData, setPokemonData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Función de alerta (NO usar alert() en React, se simula con console/modal)
  const alerta = (pokemon) => {
    console.log(`Clickaste el Pokémon: ${pokemon}`);
    // Se mantiene alert() para este ejemplo, pero se recomienda un modal personalizado.
    alert(`Clickaste el Pokémon: ${pokemon}`);
  }
  
  useEffect(() => {
    const obternetPokemons = async () => {
      try {
        setLoading(true);
        const url = 'https://pokeapi.co/api/v2/pokemon/?limit=20'; 

        const resLista = await fetch(url);
        const datosLista = await resLista.json();
        const listaPokemon = datosLista.results;

        // Fetch de todos los detalles en paralelo
        const promesasDetalle = listaPokemon.map(pokemon => fetch(pokemon.url));
        const respuestasDetalle = await Promise.all(promesasDetalle);
        const datosDetallePromesas = respuestasDetalle.map(res => res.json());
        const fichasCompletas = await Promise.all(datosDetallePromesas);

        setPokemonData(fichasCompletas);
      } catch (err) {
        console.error("Error al obtener datos:", err);
      } finally {
        setLoading(false);
      }
    };

    obternetPokemons(); 
  }, []);


  return (
    <>
      <div className="min-h-screen">
        <header className="app-header">
          <h1 className="app-title">
            Galería Pokémon
          </h1>
          <p className="app-subtitle">
            ¡Haz hover para ver su forma shiny!
          </p>
        </header>

        {/* Indicador de Carga */}
        {loading && (
          <div className="flex justify-center items-center h-40">
            <svg className="animate-spin h-10 w-10 text-red-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span className="ml-3 text-lg text-gray-700">Cargando datos...</span>
          </div>
        )}

        {/* Contenedor de la Galería (Responsive Grid) */}
        <div 
          id='container' 
          className='gallery-container'
        >
          {pokemonData.map(pokemon => (
            <PokemonCard 
              onSaludar={() => alerta(pokemon.name)} 
              key={pokemon.id} 
              id={pokemon.id} 
              name={pokemon.name.toUpperCase()} 
              sprite={pokemon.sprites.front_default}
              spritShiny={pokemon.sprites.front_shiny || pokemon.sprites.front_default} 
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default App;