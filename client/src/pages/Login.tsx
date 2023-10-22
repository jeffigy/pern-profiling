import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

type LoginProps = {
  [x: string]: any;
  setAuth: (bool: boolean) => void;
};

const Login: React.FC<LoginProps> = ({ setAuth }) => {
  // all input states
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  // destructured inputs
  const { email, password } = inputs;

  // inputs onChange function
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  //form sumbit function
  const onSubmitForm = async (e: React.FormEvent) => {
    // prevent browser page reload
    e.preventDefault();

    try {
      const body = { email, password };
      const response = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      //parse response as JSON
      const { token } = await response.json();

      // if there is existing token
      if (token) {
        // store token in localstorage
        localStorage.setItem("token", token);
        // set setAuth to true
        setAuth(true);
        // show toast
        toast.success("Logged in Successfully");
      } else {
        setAuth(false);
        toast.error("Email or Password is incorrect");
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
          <Button className="w-full bg-purple-700">Login</Button>
        </CardFooter>
      </Card>
    </form>
  );
};
export default Login;
