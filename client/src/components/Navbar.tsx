import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
type NavbarProps = {};

const Navbar: React.FC<NavbarProps> = () => {
  return (
    <div className="flex h-[56px] items-center justify-between bg-gray-200 px-5">
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
      <div className="bg-sky-700 px-4 py-2 text-white hover:bg-sky-800 sm:px-8 sm:py-3"></div>
    </div>
  );
};
export default Navbar;
