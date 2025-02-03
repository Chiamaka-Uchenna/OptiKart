import { FaStar } from "react-icons/fa";

interface ReviewCardProps {
  reviewerName: string;
  rating: number;
  feedback: string;
}

const ReviewCard: React.FC<ReviewCardProps> = ({
  reviewerName,
  rating,
  feedback,
}) => {
  return (
    <div className="flex flex-col items-center bg-deep-blue text-white py-12 px-12 rounded-lg shadow-lg w-full max-w-[400px] h-auto">
      <p className="text-center text-white text-sm">{feedback}</p>
      <h3 className="mt-1 text-white font-bold">{reviewerName}</h3>
      <div className="mt-3 flex items-center gap-2">
        <FaStar className="text-golden-yellow" size={16} />
        <p className="text-lg text-golden-yellow font-thin">{rating}</p>
      </div>
    </div>
  );
};

export default ReviewCard;
