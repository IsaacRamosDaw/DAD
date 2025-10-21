function MenuItem({ name, thumbnail }) {
  // Fallback de imagen en caso de que thumbnail sea null/undefined
  const imageUrl = thumbnail || 'https://placehold.co/400x200/e2e8f0/64748b?text=No+Image';

  return (
    <div className="food-card">
      <img 
        src={imageUrl} 
        alt={name} 
        className="food-image" 
        onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/400x200/e2e8f0/64748b?text=No+Image" }}
      />
      <div className="food-card-content">
        <h3 className="food-title">
          {name}
        </h3>
      </div>
    </div>
  );
}

export default MenuItem