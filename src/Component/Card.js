import React from 'react';


function Card (props) {
    return (

        <div className="card">
          <img src={props.imageUrl} alt="Service" className="card-image" />
          <div className="card-content">
            <p>{props.name}</p>
            <p className="card-description">{props.description}</p>
          </div>
        </div>

        );
}


export default Card