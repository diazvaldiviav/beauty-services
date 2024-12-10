import React, { Suspense, lazy } from "react";
import { useLocation } from "react-router-dom";
import Header from "./Layout/Header";
import LoadingSpinner from "./Common/LoadingSpinner.js";
import CartProvider from "../Context/CartProvider.js";
import { AuthProvider } from '../Context/AuthContext'; // Importamos AuthProvider
import Services from "../Data/Services.js";
import card from "../Data/Card.js";

// Lazy loading de componentes
const LazyRoutes = lazy(() => import("../Routes/Routers"));
const LazyServices = lazy(() => import("./Layout/Services.js"));
const LazyAbout = lazy(() => import("./Layout/About.js"));
const LazyProducts = lazy(() => import("./Layout/Products.js"));
const LazyValueMessage = lazy(() => import("./Layout/ValueMessage.js"));
const LazyTestimonials = lazy(() => import("./Layout/Testimonials.js"));
const LazyContact = lazy(() => import("./Layout/Contact.js"));

function App() {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const isAdminPage = location.pathname === "/admin";

  return (
    <AuthProvider>
      <CartProvider>
        {!isAdminPage && <Header />}
        <Suspense fallback={<LoadingSpinner />}>
          <LazyRoutes />
          {isHomePage && (
            <>
             
              <LazyAbout />
              <LazyServices services={Services} />
              <LazyProducts card={card} />
              <LazyValueMessage />
              <LazyTestimonials />
              <LazyContact />
            </>
          )}
        </Suspense>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;