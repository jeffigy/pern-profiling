import React from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

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
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-purple-700">Log out</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>are sure you want to log out?</DialogTitle>
          <DialogDescription>This action cannot be undone</DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex justify-between">
          <Button className="bg-red-700" onClick={logOut}>
            Yes, log me out
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
export default LogOut;
