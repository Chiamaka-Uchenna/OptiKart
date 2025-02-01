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
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <main className="relative">
        <Navbar />
        <div className="pt-20">
          {" "}
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
