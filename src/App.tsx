import "./App.css";
import {
  Hero,
  PopularProducts,
  SuperQuality,
  Services,
  SpecialOffers,
  CustomerReviews,
  Subscribe,
  Footer,
} from "./sections";
import Navbar from "./components/Navbar";
import ProductPage from "./pages/ProductPage";
import ProductDetailsPage from "./pages/ProductDetailsPage"; // Dynamic route for product details
import SearchResults from "./pages/SearchResults"; 
import CategoryPage from "./pages/CategoryPage"; // New Category page
import BrandPage from "./pages/BrandPage"; // the new BrandPage component
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <main className="relative">
        <Navbar />
        <div className="pt-20">
          {/* Ensures all pages are not covered by the navbar */}
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <section className="xl:padding-l wide:padding-r padding-b">
                    <Hero />
                  </section>
                  <section className="padding">
                    <PopularProducts />
                  </section>
                  <section className="padding">
                    <SuperQuality />
                  </section>
                  <section className="padding-x py-10">
                    <Services />
                  </section>
                  <section className="padding">
                    <SpecialOffers />
                  </section>
                  <section className="bg-pale-blue padding">
                    <CustomerReviews />
                  </section>
                  <section className="padding-x sm:py-32 py-16 w-full">
                    <Subscribe />
                  </section>
                </>
              }
            />
            <Route path="/products" element={<ProductPage />} />
            <Route path="/product/:id" element={<ProductDetailsPage />} />
            <Route path="/search" element={<SearchResults />} />
            {/* New route for category page */}
            <Route path="/category/:category" element={<CategoryPage />} />
            {/* New route for brand page */}
            <Route path="/brand/:brand" element={<BrandPage />} />{" "}
            {/* 👈 Added BrandPage route */}
          </Routes>
        </div>
        <section className="bg-deep-blue padding-x padding-t pb-8">
          <Footer />
        </section>
      </main>
    </Router>
  );
}

export default App;
