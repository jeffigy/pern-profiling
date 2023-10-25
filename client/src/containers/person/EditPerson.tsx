import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
type EditPersonProps = {
  data: any;
  setPersonsChange: (bool: boolean) => void;
};

const EditPerson: React.FC<EditPersonProps> = ({ data }) => {
  console.log(data);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [open, setOpen] = useState(false);
  const [personDetails, setPersonDetails] = useState({
    fname: data.person_fname,
    lname: data.person_lname,
    bday: data.person_bday,
    sex: data.person_sex,
    address: data.person_address,
  });
  // destructured personDetails
  const { fname, lname, bday, sex, address } = personDetails;

  // personDetails onChange function
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPersonDetails({ ...personDetails, [e.target.name]: e.target.value });
  };

  async function editDetails(id: number) {
    try {
      const body = { fname, lname, bday, sex, address };
      console.log(body);
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("token", localStorage.token);

      await fetch(`http://localhost:5000/home/persons/${id}`, {
        method: "PUT",
        headers: myHeaders,
        body: JSON.stringify(body),
      });
    } catch (error) {
      console.error((error as Error).message);
    }
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Edit</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>{/* <DialogTitle>{data}</DialogTitle> */}</DialogHeader>
        <form>
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
              onClick={() => editDetails(data.person_id)}
            >
              {isLoading === true ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Updating Person
                </>
              ) : (
                "Update Person"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
export default EditPerson;
