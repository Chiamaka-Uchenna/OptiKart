import React from "react";
import { Drawer, Button, Divider } from "@mui/material";
import { FaTimes } from "react-icons/fa";
import { navLinks } from "../constants";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  navigate: (path: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, navigate }) => {
  // Define your colors
  const goldenYellow = "#FFD700";
  const deepBlue = "#000957";

  return (
    <div className="lg:hidden">
      {/* Hide on large screens */}
      <Drawer anchor="left" open={isOpen} onClose={onClose}>
        <div className="p-4 w-64">
          <Button
            onClick={onClose}
            // Close button styling: golden yellow by default, deep blue on hover
            sx={{
              mb: 2,
              color: goldenYellow,
              fontWeight: "bold",
              "&:hover": { color: deepBlue },
            }}
          >
            <FaTimes />
          </Button>
          <Divider />
          {navLinks.map((link) => (
            <Button
              key={link.id}
              fullWidth
              onClick={() => {
                navigate(link.href);
                onClose(); // Close sidebar after navigation
              }}
              // Nav link styling: golden yellow by default, deep blue on hover
              sx={{
                mb: 2,
                color: goldenYellow,
                fontWeight: "bold",
                "&:hover": { color: deepBlue },
              }}
            >
              {link.title}
            </Button>
          ))}
        </div>
      </Drawer>
    </div>
  );
};

export default Sidebar;
