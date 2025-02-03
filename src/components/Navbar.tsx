import { useState, useEffect } from "react";
import { FaBars, FaSearch } from "react-icons/fa";
import { navLinks } from "../constants";
import logo from "../assets/images/logo.png";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar"; // Import Sidebar

const Navbar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const navigate = useNavigate();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  // Close sidebar automatically when screen size is large
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <header className="bg-white w-full fixed top-0 left-0 z-50 shadow-lg">
        <nav className="text-golden-yellow p-4 flex items-center justify-between">
          <button
            className="lg:hidden text-deep-blue text-2xl"
            onClick={() => setIsOpen(true)} // Open sidebar
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
            <form onSubmit={handleSearchSubmit} className="flex">
              <input
                type="text"
                placeholder="Search for products, brands and categories"
                className="px-6 py-1 text-black focus:outline-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button type="submit" className="bg-deep-blue px-3 py-3">
                <FaSearch className="text-golden-yellow" />
              </button>
            </form>
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

      {/* Sidebar component */}
      <Sidebar
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        navigate={navigate}
      />
    </>
  );
};

export default Navbar;
