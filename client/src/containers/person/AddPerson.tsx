import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, UserPlus } from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";

type AddPersonProps = {
  setPersonsChange: (bool: boolean) => void;
};

const AddPerson: React.FC<AddPersonProps> = ({ setPersonsChange }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [open, setOpen] = useState(false);
  const [personDetails, setPersonDetails] = useState({
    fname: "",
    lname: "",
    bday: "",
    sex: "",
    address: "",
  });
  // destructured personDetails
  const { fname, lname, bday, sex, address } = personDetails;

  // personDetails onChange function
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPersonDetails({ ...personDetails, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("token", localStorage.token);
      const body = {
        fname,
        lname,
        bday,
        sex,
        address,
      };

      const response = await fetch("http://localhost:5000/home/persons", {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify(body),
      });
      await response.json();
      setPersonsChange(true);
      setPersonDetails({
        fname: "",
        lname: "",
        bday: "",
        sex: "",
        address: "",
      });
      setIsLoading(false);
      toast.success("Person added Successfully");
      setOpen(false);
    } catch (error) {
      console.error((error as Error).message);
    }
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
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
          <DialogTitle>Add Person</DialogTitle>
        </DialogHeader>
        <form onSubmit={onSubmit}>
          <div className="grid gap-4 py-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="fname">First Name</Label>
              <Input
                id="fname"
                name="fname"
                type="text"
                value={fname}
                onChange={(e) => onChange(e)}
                required
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="lname">Last Name</Label>
              <Input
                id="lname"
                name="lname"
                type="text"
                value={lname}
                onChange={(e) => onChange(e)}
                required
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="bday">Date of Birth</Label>

              <Input
                id="bday"
                name="bday"
                type="date"
                value={bday}
                onChange={(e) => onChange(e)}
                required
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="sex">Sex</Label>
              <Input
                id="sex"
                name="sex"
                type="text"
                value={sex}
                onChange={(e) => onChange(e)}
                required
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                name="address"
                type="text"
                value={address}
                onChange={(e) => onChange(e)}
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              disabled={isLoading}
              type="submit"
              className="w-full bg-purple-700"
            >
              {isLoading === true ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Adding Person
                </>
              ) : (
                "Add Person"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
export default AddPerson;
