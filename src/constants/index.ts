// export const navLinks = [
//   { href: "#home", label: "Home" },
//   { href: "#about-us", label: "About Us" },
//   { href: "#products", label: "Products" },
//   { href: "#contact-us", label: "Contact Us" },
// ];
import { FaUserCircle, FaShoppingCart, FaHeart } from "react-icons/fa";
import {
  facebook,
  instagram,
  shieldTick,
  support,
  truckFast,
  twitter,
} from "../assets/icons";
import {
  bigShoe1,
  bigShoe2,
  bigShoe3,
  customer1,
  customer2,
  shoe4,
  shoe5,
  shoe6,
  shoe7,
  thumbnailShoe1,
  thumbnailShoe2,
  thumbnailShoe3,
} from "../assets/images";

// Define the types
interface NavLink {
  id: string;
  title?: string; // Optional for favourites
  href: string;
  icon?: React.FC<{ className?: string }>; // Icon as React Component
}

interface Shoe {
  thumbnail: string;
  bigShoe: string;
}

interface Statistic {
  value: string;
  label: string;
}

interface Product {
  imgURL: string;
  name: string;
  price: string;
}

interface Service {
  imgURL: string;
  label: string;
  subtext: string;
}

interface Review {
  imgURL: string;
  customerName: string;
  rating: number;
  feedback: string;
}

interface FooterLink {
  name: string;
  link: string;
}

interface FooterSection {
  title: string;
  links: FooterLink[];
}

interface SocialMedia {
  src: string;
  alt: string;
}

// Data arrays
export const navLinks: NavLink[] = [
  { id: "category", title: "Category", href: "/category" },
  { id: "deals", title: "Deals", href: "/deals" },
  { id: "whatsnew", title: "What's New", href: "/whatsnew" },
  { id: "account", title: "Account", href: "/account", icon: FaUserCircle },
  { id: "cart", title: "Cart", href: "/cart", icon: FaShoppingCart },
  { id: "favourites", href: "/favourites", icon: FaHeart },
];

export const shoes: Shoe[] = [
  {
    thumbnail: thumbnailShoe1,
    bigShoe: bigShoe1,
  },
  {
    thumbnail: thumbnailShoe2,
    bigShoe: bigShoe2,
  },
  {
    thumbnail: thumbnailShoe3,
    bigShoe: bigShoe3,
  },
];

export const statistics: Statistic[] = [
  { value: "1k+", label: "Brands" },
  { value: "500+", label: "Shops" },
  { value: "250k+", label: "Customers" },
];

export const products: Product[] = [
  {
    imgURL: shoe4,
    name: "Nike Air Jordan-01",
    price: "$200.20",
  },
  {
    imgURL: shoe5,
    name: "Nike Air Jordan-10",
    price: "$210.20",
  },
  {
    imgURL: shoe6,
    name: "Nike Air Jordan-100",
    price: "$220.20",
  },
  {
    imgURL: shoe7,
    name: "Nike Air Jordan-001",
    price: "$230.20",
  },
];

export const services: Service[] = [
  {
    imgURL: truckFast,
    label: "Free shipping",
    subtext: "Enjoy seamless shopping with our complimentary shipping service.",
  },
  {
    imgURL: shieldTick,
    label: "Secure Payment",
    subtext:
      "Experience worry-free transactions with our secure payment options.",
  },
  {
    imgURL: support,
    label: "Love to help you",
    subtext: "Our dedicated team is here to assist you every step of the way.",
  },
];

export const reviews: Review[] = [
  {
    imgURL: customer1,
    customerName: "Morich Brown",
    rating: 4.5,
    feedback:
      "The attention to detail and the quality of the product exceeded my expectations. Highly recommended!",
  },
  {
    imgURL: customer2,
    customerName: "Lota Mongeskar",
    rating: 4.5,
    feedback:
      "The product not only met but exceeded my expectations. I'll definitely be a returning customer!",
  },
];

export const footerLinks: FooterSection[] = [
  {
    title: "Category",
    links: [
      { name: "Furniture", link: "/" },
      { name: "Beauty", link: "/" },
      { name: "Grocery", link: "/" },
      { name: "Gadgets", link: "/" },
    ],
  },
  {
    title: "Help",
    links: [
      { name: "About us", link: "/" },
      { name: "FAQs", link: "/" },
      { name: "How it works", link: "/" },
      { name: "Privacy policy", link: "/" },
      { name: "Payment policy", link: "/" },
    ],
  },
  {
    title: "Get in touch",
    links: [
      { name: "customer@optikart.com", link: "mailto:customer@optikart.com" },
      { name: "+92554862354", link: "tel:+92554862354" },
    ],
  },
];

export const socialMedia: SocialMedia[] = [
  { src: facebook, alt: "facebook logo" },
  { src: twitter, alt: "twitter logo" },
  { src: instagram, alt: "instagram logo" },
];
