import React from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
type LogOutProps = {
  setAuth: (bool: boolean) => void;
};

const LogOut: React.FC<LogOutProps> = ({ setAuth }) => {
  const logOut = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    localStorage.removeItem("token");
    setAuth(false);
    toast("You have been logged out");
  };
  return (
    <Button className="bg-purple-700" onClick={logOut}>
      Log out
    </Button>
  );
};
export default LogOut;
