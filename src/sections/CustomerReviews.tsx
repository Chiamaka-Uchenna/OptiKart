import { useState, useEffect } from "react";
import ReviewCard from "../components/ReviewCard";
import { Review } from "../types/ProductType"; // Import the Review type
import { apiUrl } from "../services/api"; // Import apiUrl

const CustomerReviews = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(apiUrl); // Using apiUrl
        const data = await response.json();

        if (!data.products) {
          throw new Error("Invalid API response format");
        }

        // Extract reviews from products and filter by rating
        const allReviews: Review[] = data.products.flatMap(
          (product: { reviews?: Review[] }) => product.reviews || []
        );

        const filteredReviews = allReviews.filter(
          (review) => review.rating >= 4 && review.rating <= 5
        );

        setReviews(filteredReviews.slice(0, 5));
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchReviews();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        reviews.length > 0 ? (prevIndex + 1) % reviews.length : 0
      );
    }, 4000);

    return () => clearInterval(interval);
  }, [reviews.length]);

  return (
    <section className="max-container relative overflow-hidden h-[400px] flex flex-col items-center">
      <h3 className="font-palanquin text-center text-4xl font-bold">
        What our <span className="text-coral-red"> Customers </span> say?
      </h3>
      <p className="info-text m-auto mt-4 max-w-lg text-center">
        Hear genuine stories from our satisfied customers about their
        exceptional experiences with us.
      </p>

      <div className="relative w-[400px] h-[200px] mt-6 flex items-center justify-center overflow-hidden">
        {reviews.length > 0 ? (
          reviews.map((review: Review, index: number) => (
            <div
              key={index}
              className={`absolute transition-transform duration-1000 ease-in-out ${
                index === currentIndex
                  ? "translate-x-0 opacity-100"
                  : "translate-x-full opacity-0"
              }`}
            >
              <ReviewCard
                reviewerName={review.reviewerName || "Anonymous"}
                feedback={review.comment || "No comment provided"}
                rating={review.rating}
              />
            </div>
          ))
        ) : (
          <p className="text-gray-400">Loading reviews...</p>
        )}
      </div>
    </section>
  );
};

export default CustomerReviews;
