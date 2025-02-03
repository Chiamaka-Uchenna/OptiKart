import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Product } from "../types/ProductType";
import { motion } from "framer-motion";
import { FaArrowLeft, FaShoppingCart, FaCreditCard } from "react-icons/fa";
import { apiUrl } from "../services/api";

const ProductDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate(); // Hook to go back
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;
      try {
        const response = await fetch(`${apiUrl}/${id}`);
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="text-center text-lg font-semibold">
        Loading product details...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center text-red-500 text-lg">Product not found!</div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-lg font-semibold text-golden-yellow hover:text-blue-800 mb-4"
      >
        <FaArrowLeft className="mr-2" /> Back to previous
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Product Image Section */}
        <motion.div
          className="flex flex-col items-center bg-deep-blue p-6 rounded-lg shadow-md"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <img
            src={product.thumbnail}
            alt={product.title}
            className="w-full max-w-md object-cover rounded-lg"
          />
          <div className="flex gap-2 mt-4">
            {product.images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Preview ${index}`}
                className="w-16 h-16 rounded-md border cursor-pointer"
              />
            ))}
          </div>
        </motion.div>

        {/* Product Info Section */}
        <div className="space-y-4">
          <h1 className="text-3xl font-bold text-gray-900">{product.title}</h1>
          <p className="text-lg text-gray-700">{product.description}</p>
          <p className="text-2xl font-semibold text-deep-blue">
            ${product.price}
          </p>
          <p className="text-yellow-500 text-lg">⭐ {product.rating} / 5</p>
          <p className="text-sm text-gray-600">
            Stock: {product.stock} available
          </p>
          <p className="text-sm text-gray-600">Brand: {product.brand}</p>

          {/* Warranty & Shipping */}
          <p className="text-sm text-gray-600">
            📦 Shipping: {product.shippingInformation}
          </p>
          <p className="text-sm text-gray-600">
            🛡️ Warranty: {product.warrantyInformation}
          </p>

          {/* Return Policy */}
          <p className="text-sm text-gray-600">
            🔄 Return Policy: {product.returnPolicy}
          </p>

          {/* Buttons */}
          <div className="flex space-x-4 mt-4">
            <button className="flex items-center px-6 py-2 bg-deep-blue text-white rounded-lg shadow-lg hover:bg-blue-700">
              <FaShoppingCart className="mr-2" /> Add to Cart
            </button>
            <button className="flex items-center px-6 py-2 bg-golden-yellow text-white rounded-lg shadow-lg hover:bg-yellow-700">
              <FaCreditCard className="mr-2" /> Buy Now
            </button>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mt-10">
        <h2 className="text-2xl font-bold mb-4">Customer Reviews</h2>
        {product.reviews.length > 0 ? (
          <div className="space-y-4">
            {product.reviews.map((review, index) => (
              <motion.div
                key={index}
                className="p-4 border border-gray-200 rounded-lg shadow-sm"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <p className="text-yellow-500">⭐ {review.rating} / 5</p>
                <p className="text-gray-700">{review.comment}</p>
                <p className="text-sm text-gray-500">
                  - {review.reviewerName},{" "}
                  {new Date(review.date).toDateString()}
                </p>
              </motion.div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600">
            No reviews yet. Be the first to review this product!
          </p>
        )}
      </div>
    </div>
  );
};

export default ProductDetailsPage;
