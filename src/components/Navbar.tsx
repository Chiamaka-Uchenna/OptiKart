import { useState } from "react";
import { FaBars, FaSearch } from "react-icons/fa";
import { navLinks } from "../constants";
import logo from "../assets/images/logo.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <header className="bg-white w-full fixed top-0 left-0 z-50 shadow-lg">
      <nav className="text-golden-yellow p-4 flex items-center justify-between">
        <button
          className="lg:hidden text-deep-blue text-2xl"
          onClick={() => setIsOpen(!isOpen)}
        >
          <FaBars />
        </button>

        <div className="flex items-center justify-center ml-2">
          <img src={logo} alt="Logo" className="h-10" />
        </div>

        <div className="hidden lg:flex justify-around gap-4 max-w-2xl">
          {navLinks.slice(0, 3).map((link) => (
            <a
              key={link.id}
              href={link.href}
              className="text-lg font-montserrat hover:underline"
            >
              {link.title}
            </a>
          ))}
        </div>

        <div className="hidden lg:flex items-center border border-deep-blue rounded-lg overflow-hidden">
          <input
            type="text"
            placeholder="Search for products, brands and categories"
            className="px-6 py-1 text-black focus:outline-none"
          />
          <button className="bg-deep-blue px-3 py-3">
            <FaSearch className="text-golden-yellow" />
          </button>
        </div>

        <div className="flex items-center gap-4">
          {navLinks.slice(3).map((link) => (
            <a
              key={link.id}
              href={link.href}
              className="flex items-center gap-2 text-lg hover:underline"
            >
              {link.icon && <link.icon className="text-2xl" />}
              <span className="hidden lg:inline">{link.title}</span>
            </a>
          ))}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
