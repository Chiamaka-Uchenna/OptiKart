import { FC } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom
import { arrowRight } from "../assets/icons";
import { offer } from "../assets/images";
import Button from "../components/Button";

const SpecialOffers: FC = () => {
  const navigate = useNavigate(); // Create a navigate function

  const handleShopNowClick = () => {
    navigate("/Products"); // Redirect to the ProductPage
  };

  return (
    <section className="flex justify-between items-center max-xl:flex-col-reverse gap-10 max-container">
      {/* Left Side: Offer Image */}
      <div className="flex-1">
        <img
          src={offer}
          alt="Special Offers"
          width={773}
          height={687}
          className="object-contain w-full"
        />
      </div>

      {/* Right Side: Offer Details */}
      <div className="flex flex-1 flex-col">
        <h2 className="font-palanquin text-4xl capitalize font-bold lg:max-w-lg">
          Enjoy <span className="text-golden-yellow">Exclusive</span> Deals from
          <span className="text-golden-yellow"> Top Brands</span>
        </h2>
        <p className="mt-4 lg:max-w-lg info-text">
          Discover unbeatable discounts on premium products from your favorite
          brands. Whether you're upgrading your home, enhancing your lifestyle,
          or seeking the best value, our special offers ensure you get the most
          for your money.
        </p>
        <p className="mt-6 lg:max-w-lg info-text">
          Shop with confidence and enjoy handpicked selections tailored to your
          needs, all at the most competitive prices. Limited-time deals—grab
          them before they’re gone!
        </p>

        {/* Action Buttons */}
        <div className="mt-11 flex flex-wrap gap-4">
          <Button
            label="Shop Now"
            iconURL={arrowRight}
            onClick={handleShopNowClick} // Trigger navigation on click
          />
          <Button
            label="Learn More"
            backgroundColor="bg-white"
            borderColor="border-slate-gray"
            textColor="text-slate-gray"
          />
        </div>
      </div>
    </section>
  );
};

export default SpecialOffers;
