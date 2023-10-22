import { Button } from "@/components/ui/button";
import React from "react";
import { toast } from "sonner";
type LandingProps = {};

const Landing: React.FC<LandingProps> = () => {
  return (
    <div className="flex flex-col space-y-5">
      <p> landing page</p>
      <Button onClick={() => toast("This is a toast", { duration: 3000 })}>
        Show Toast
      </Button>

      <Button
        onClick={() => toast.loading("This is a toast", { duration: 3000 })}
      >
        loading toast
      </Button>
      <Button
        onClick={() =>
          toast.custom((t) => (
            <div>
              This is a custom component{" "}
              <Button onClick={() => toast.dismiss(t)}>close</Button>
            </div>
          ))
        }
      >
        Custom toast
      </Button>
      <Button
        onClick={() =>
          toast("Hello World", {
            position: "top-center",
          })
        }
      >
        {" "}
        Dynamic Postion
      </Button>
      <Button onClick={() => toast.error("My error toast")}>
        {" "}
        Error toast
      </Button>
    </div>
  );
};
export default Landing;
