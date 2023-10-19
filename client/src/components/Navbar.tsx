import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
type NavbarProps = {};

const Navbar: React.FC<NavbarProps> = () => {
  return (
    <div className="flex h-[56px] bg-gray-200 justify-between items-center px-5">
      <h1 className="text-2xl font-bold">Title</h1>
      <div className="flex gap-5">
        <Link className="text-purple-700" to="/">
          Home
        </Link>
        <Link className="text-purple-700" to="/profile">
          Profile
        </Link>
        <Link className="text-purple-700" to="/settings">
          Settings
        </Link>
      </div>
      <Button variant="ghost">Logout</Button>
      <div className="text-white px-4 sm:px-8 py-2 bg-sky-700 sm:py-3 hover:bg-sky-800"></div>
    </div>
  );
};
export default Navbar;
