function MenuItem({ name, thumbnail }) {
  const precioAleatorio = () => Math.random() * (19 - 8) + 8; 

  return (
    <div className="food-card">
      <img 
        src={thumbnail} 
        alt={name} 
        className="food-image" 
        onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/400x200/e2e8f0/64748b?text=No+Image" }}
      />
      <div className="food-card-content">
        <h3 className="food-title">{name}</h3>
        <p className="food-price">{precioAleatorio().toFixed(2) + "€"}</p>
      </div>
    </div>
  );
}

export default MenuItem