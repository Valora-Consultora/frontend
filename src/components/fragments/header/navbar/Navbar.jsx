import React from "react";
import NavLinks from "./navlinks/Navlinks.jsx";

const Navbar = () => {
  return (
    <nav className="flex items-center h-full p-[1px]">
      <NavLinks />
    </nav>
  );
};

export default Navbar;