import React from "react";
import About from "./About";
import Services from "./Services";
import Image from "./Img";
import Style from "../Styles/Style.css"
import services from "../Data/Services";
import card from "../Data/Card";
import Products from "./Products";

function Page() {
    return (
      <React.StrictMode>

          <Image />
  
          <About />
          
          <Services services = {services}/> 
     
          <Products card={card}/>
            
      </React.StrictMode>
    );
  }
  
  export default Page;