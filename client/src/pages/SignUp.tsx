import * as React from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

type SignUpProps = { setAuth: (bool: boolean) => void };

const SignUp: React.FC<SignUpProps> = ({ setAuth }) => {
  // all input states
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
  });

  // destructured inputs
  const { name, email, password } = inputs;

  // inputs onChange function
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  // format submit function
  const onSubmitForm = async (e: React.FormEvent) => {
    // prevent page reload
    e.preventDefault();
    try {
      const body = { name, email, password };
      const response = await fetch("http://localhost:5000/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      //parse response as JSON
      const parseRes = await response.json();
      // if there is existing token
      if (parseRes.token) {
        // store token in localstorage
        localStorage.setItem("token", parseRes.token);
        // set setAuth to true
        setAuth(true);
        // show toast
        toast.success("Registered Successfully");
      } else {
        setAuth(false);
        toast.error(`${parseRes}`);
      }
    } catch (error) {
      console.error((error as Error).message);
    }
  };

  return (
    <form onSubmit={onSubmitForm}>
      <Card className="w-[450px]">
        <CardHeader className="items-center">
          {/* <CardTitle>Profiling App</CardTitle> */}
        </CardHeader>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                type="text"
                value={name}
                onChange={(e) => onChange(e)}
                // required
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => onChange(e)}
                required
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={(e) => onChange(e)}
                required
              />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full bg-purple-700">Sign Up</Button>
        </CardFooter>
      </Card>
    </form>
  );
};
export default SignUp;
