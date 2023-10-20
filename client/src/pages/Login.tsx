import React from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type LoginProps = {};

const Login: React.FC<LoginProps> = () => {
  return (
    <Card className="w-[450px]">
      <CardHeader className="items-center">
        {/* <CardTitle>Profiling App</CardTitle> */}
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input id="email" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input id="password" />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <Button className="w-full bg-purple-700">Login</Button>
      </CardFooter>
    </Card>
  );
};
export default Login;
