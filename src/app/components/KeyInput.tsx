import { useContext, useEffect, useState } from "react";
import { UserContext } from "../store/userContext";
import { useToast } from "./ui/use-toast";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

type propTypes = {
  onKeyChange?: Function;
};

const KeyInput = (props: propTypes) => {
  const ctx = useContext(UserContext);
  const { toast } = useToast();
  const [isKeySet, setIsKeySet] = useState(ctx.key.length != 0 ? true : false);
  const [keyValue, setKeyValue] = useState("");

  useEffect(() => {
    if (ctx.key.length != 0) setIsKeySet(true);
  }, [ctx.key]);

  const submitHandler = (e: any) => {
    e.preventDefault();
    if (isKeySet) return;
    if (keyValue.length < 8 || keyValue.length > 8) {
      toast({
        title: "Key Value not Accepted",
        description: "Key must be of 8 digits.",
        variant: "destructive",
        duration: 9000,
      });
      return;
    }
    ctx.key = keyValue;
    if (props.onKeyChange) {
      props.onKeyChange();
    }

    setIsKeySet(true);
  };

  return (
    <div className="my-3">
      {!isKeySet && (
        <form
          onSubmit={submitHandler}
          className="flex sm:gap-3 gap-1 items-center"
        >
          <Input
            type="number"
            placeholder="Enter General Key"
            onChange={(e) => {
              setKeyValue(e.target.value);
            }}
            className=" focus:outline-none focus:border-none w-1/2"
          />
          <Button type="submit" size={"sm"}>
            Submit
          </Button>
        </form>
      )}
      {isKeySet && (
        <h6 className="text-sm flex sm:text-lg sm:items-center gap-2 font-semibold my-2 tracking-wider">
          {"General Key : " + ctx.key}
          <span className=" text-muted-foreground text-sm font-normal">
            // to change this reload.
          </span>
        </h6>
      )}
    </div>
  );
};

export default KeyInput;
