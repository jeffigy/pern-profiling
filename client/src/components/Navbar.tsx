import React from "react";
import { Link } from "react-router-dom";
import LogOut from "@/containers/LogOut";

type NavbarProps = {
  isAuthenticated: boolean;
  setAuth: (bool: boolean) => void;
};

const Navbar: React.FC<NavbarProps> = ({ isAuthenticated, setAuth }) => {
  return (
    <div className="flex h-[56px] items-center justify-between bg-gray-200 px-5">
      <h1 className="text-2xl font-bold">Profiling</h1>
      {isAuthenticated && (
        <>
          {" "}
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
          <LogOut setAuth={setAuth} />
        </>
      )}

      {!isAuthenticated && (
        <div className="flex gap-5">
          <Link className="text-purple-700" to={"/signup"}>
            Sign Up
          </Link>
          <Link className="text-purple-700" to={"/login"}>
            Log In
          </Link>
        </div>
      )}
    </div>
  );
};
export default Navbar;
