import React from 'react';

function ProductCard({ img, name }) {
  return (
    <div className='product-card'>
      <div className='product-image-container'>
        <img src={img} alt={name} className='product-icon'/>
      </div>
      <h3 className='product-name'>{name}</h3>
    </div>
  );
}

export default ProductCard;