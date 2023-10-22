import React from "react";
import Navbar from "./Navbar";

type LayoutProps = {
  children: React.ReactNode;
  isAuthenticated: boolean;
  setAuth: (bool: boolean) => void;
};

const Layout: React.FC<LayoutProps> = ({
  children,
  isAuthenticated,
  setAuth,
}) => {
  return (
    <div className="flex flex-col">
      <Navbar isAuthenticated={isAuthenticated} setAuth={setAuth} />
      <div className="mx-auto py-10"> {children}</div>
    </div>
  );
};
export default Layout;
