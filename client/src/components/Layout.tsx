import React from "react";
import Navbar from "./Navbar";

type LayoutProps = {
  children: React.ReactNode;
  isAuthenticated: boolean;
};

const Layout: React.FC<LayoutProps> = ({ children, isAuthenticated }) => {
  return (
    <div className="flex flex-col">
      <Navbar isAuthenticated={isAuthenticated} />
      <div className="mx-auto py-10"> {children}</div>
    </div>
  );
};
export default Layout;
