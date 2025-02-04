import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import Button from "../components/Button";
import { Product } from "../types/ProductType";
import { apiUrl } from "../services/api";

const SuperQuality: FC = () => {
  const [furnitureImage, setFurnitureImage] = useState<string>("");
  const navigate = useNavigate(); // Initialize navigate function

  useEffect(() => {
    const fetchFurniture = async () => {
      try {
        const response = await fetch(`${apiUrl}/category/furniture`);
        const data = await response.json();
        const product: Product = data.products[0];

        if (product && product.images.length > 0) {
          setFurnitureImage(product.images[0]);
        }
      } catch (error) {
        console.error("Error fetching furniture:", error);
      }
    };

    fetchFurniture();
  }, []);

  // Click handler for navigation
  const handleNavigation = () => {
    navigate("/category/furniture");
  };

  return (
    <section
      id="about-us"
      className="flex justify-between items-center max-lg:flex-col gap-10 w-full max-container"
    >
      {/* Text Content */}
      <div className="flex flex-1 flex-col">
        <h2 className="font-palanquin text-4xl capitalize font-bold lg:max-w-lg">
          Our
          <span className="text-deep-blue"> Super</span>
          <span className="text-golden-yellow"> Quality</span> Products
        </h2>
        <p className="mt-4 lg:max-w-lg info-text">
          Experience comfort and elegance with our meticulously crafted
          products. Designed to enhance your living, our products offer
          durability, style, and functionality for a perfect home ambiance.
        </p>
        <p className="mt-6 lg:max-w-lg info-text">
          At OptiKart, we are dedicated to providing products that combine
          aesthetic appeal with long-lasting quality.
        </p>
        <div className="mt-11">
          {/* Attach click handler to the button */}
          <Button label="View Collection" onClick={handleNavigation} />
        </div>
      </div>

      {/* Image Section */}
      <div className="flex-1 flex justify-center items-center">
        <div
          className="bg-yellow-400 p-6 rounded-lg shadow-lg cursor-pointer"
          onClick={handleNavigation} // Attach click handler to the image container
        >
          {furnitureImage ? (
            <img
              src={furnitureImage}
              alt="Furniture"
              width={500}
              height={450}
              className="object-contain rounded-lg"
            />
          ) : (
            <p className="text-center text-black font-bold">
              Loading Furniture...
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default SuperQuality;
