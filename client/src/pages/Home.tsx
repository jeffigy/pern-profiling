import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserPlus } from "lucide-react";
import React from "react";

type HomeProps = { setAuth: (bool: boolean) => void };

const Home: React.FC<HomeProps> = ({ setAuth }) => {
  console.log(setAuth);
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="fixed bottom-5 right-5 h-14 w-14 rounded-full bg-purple-700 text-white hover:bg-purple-300"
          >
            <UserPlus />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add a Person</DialogTitle>
          </DialogHeader>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="fname">First Name</Label>
              <Input
                id="fname"
                name="fname"
                type="fname"
                // value={fname}
                // onChange={(e) => onChange(e)}
                required
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="lname">Last Name</Label>
              <Input
                id="lname"
                name="lname"
                type="lname"
                // value={lname}
                // onChange={(e) => onChange(e)}
                required
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="bday">Date of Birth</Label>
              <Input
                id="bday"
                name="bday"
                type="bday"
                // value={bday}
                // onChange={(e) => onChange(e)}
                required
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="sex">Sex</Label>
              <Input
                id="sex"
                name="sex"
                type="sex"
                // value={sex}
                // onChange={(e) => onChange(e)}
                required
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="Address">Address</Label>
              <Input
                id="Address"
                name="Address"
                type="Address"
                // value={Address}
                // onChange={(e) => onChange(e)}
                required
              />
            </div>
          </div>
          <DialogFooter className="justify-between">
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Close
              </Button>
            </DialogClose>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <div className="h-screen w-[1000px] border"></div>
    </>
  );
};
export default Home;
