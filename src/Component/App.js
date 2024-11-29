import React, { Suspense, lazy } from "react";
import { useLocation } from "react-router-dom";
import Header from "./Header";
import LoadingSpinner from "./LoadingSpinner";
import CartProvider from "./CartProvider";
import { AuthProvider } from '../Context/AuthContext'; // Importamos AuthProvider
import Services from "../Data/Services.js";
import card from "../Data/Card.js";

// Lazy loading de componentes
const LazyRoutes = lazy(() => import("../Routes/Routers"));
const LazyServices = lazy(() => import("./Services"));
const LazyAbout = lazy(() => import("./About"));
const LazyProducts = lazy(() => import("./Products"));
const LazyValueMessage = lazy(() => import("./ValueMessage"));
const LazyTestimonials = lazy(() => import("./Testimonials"));
const LazyContact = lazy(() => import("./Contact"));

function App() {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <AuthProvider>
      <CartProvider>
        <Header />
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