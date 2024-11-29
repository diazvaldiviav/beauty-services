import React from "react";
import "../Styles/Style.css";
import headerPhoto from "../assets/freepik__upload__11626.jpeg"; // Import the image
import Home from "./Home";

const Imagen = () => {
  return (
    <React.StrictMode>
      <div className="img-container">
        
        <img src={headerPhoto} alt="Header" className="header-photo" /> {/* Display the image */}

        
      </div>

      <Home />
    
    </React.StrictMode>
  );
};

export default Imagen;
