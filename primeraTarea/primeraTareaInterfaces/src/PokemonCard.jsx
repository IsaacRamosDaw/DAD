import "./PokemonCard.css"
import { useState } from "react";

function PokemonCard({ id, name, sprite, onSaludar, spritShiny }) {
  const [currentSprite, setCurrentSprite] = useState(sprite);

  const toggleSprite = () => {
    setCurrentSprite(prev => (prev === sprite ? spritShiny : sprite));
  };
    
  return (
    <div
      className="pokemon-card"
      key={id}
      onMouseEnter={toggleSprite}
      onMouseLeave={toggleSprite}
      onClick={onSaludar} 
    >
      
      <div className="card-header-content">
        <span className="pokemon-id">#{String(id).padStart(3, '0')}</span>
        <h2 className="pokemon-name">
          {name}
        </h2>
      </div>

      <div className="pokemon-image-container">
        {currentSprite ? (
          <img
            src={currentSprite}
            alt={name}
            className="pokemon-sprite"
          />
        ) : (
          <div className="placeholder-div">
            <span className="placeholder-span">No Sprite</span>
          </div>
        )}
      </div>

      <button 
        onClick={(e) => { e.stopPropagation(); onSaludar(); }}
        className="card-button"
      >
      Saludo
      </button>
      
    </div >
  );
}

export default PokemonCard;