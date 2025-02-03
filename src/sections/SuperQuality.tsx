import { FC, useEffect, useState } from "react";
import Button from "../components/Button";
import { Product } from "../types/ProductType";
import { apiUrl } from "../services/api"; // Import apiUrl

const SuperQuality: FC = () => {
  const [furnitureImage, setFurnitureImage] = useState<string>("");

  useEffect(() => {
    const fetchFurniture = async () => {
      try {
        // Use apiUrl to fetch products from the general products API
        const response = await fetch(`${apiUrl}/category/furniture`); // Example usage of apiUrl
        const data = await response.json();
        const product: Product = data.products[0]; // Get the first furniture product

        if (product && product.images.length > 0) {
          setFurnitureImage(product.images[0]); // Set the first product image
        }
      } catch (error) {
        console.error("Error fetching furniture:", error);
      }
    };

    fetchFurniture();
  }, []);

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
          At OptiKart, we are dedicated to providing products that combines
          aesthetic appeal with long-lasting quality.
        </p>
        <div className="mt-11">
          <Button label="View Collection" />
        </div>
      </div>

      {/* Image Section (Yellow Card with Furniture Image) */}
      <div className="flex-1 flex justify-center items-center">
        <div className="bg-yellow-400 p-6 rounded-lg shadow-lg">
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
