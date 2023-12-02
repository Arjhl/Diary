import { Button, Heading, Input } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../store/userContext";
import { useToast } from "@chakra-ui/react";

type propTypes = {
  onKeyChange?: Function;
};

const KeyInput = (props: propTypes) => {
  const ctx = useContext(UserContext);
  const toast = useToast();
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
        status: "error",
        duration: 9000,
        isClosable: true,
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
        <form onSubmit={submitHandler} className="flex gap-3">
          <Input
            type="number"
            placeholder="Enter Key"
            onChange={(e) => {
              setKeyValue(e.target.value);
            }}
          />
          <Button type="submit" className=" bg-slate-500 text-white">
            Submit
          </Button>
        </form>
      )}
      {isKeySet && <Heading>{ctx.key}</Heading>}
    </div>
  );
};

export default KeyInput;
