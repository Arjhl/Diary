import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/components/ui/dialog";

import { useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useToast } from "./ui/use-toast";

type proptypes = {
  setKey: Function;
  isPublic: boolean;
};

const KeyModal = (props: proptypes) => {
  const [key, setKey] = useState("");
  const { toast } = useToast();
  const [isOpen, setIsopen] = useState(false);

  const initialRef = useRef<any>();

  useEffect(() => {
    if (props.isPublic) {
      setIsopen(true);
    }
  }, []);

  return (
    <>
      <Dialog open={isOpen}>
        <DialogTrigger>Open</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="my-2">Enter Your Public Key</DialogTitle>
            <Input
              ref={initialRef}
              type="number"
              min={8}
              max={8}
              placeholder="Public Key"
              onChange={(e: any) => {
                setKey(e.target.value);
              }}
            />
            <p className=" text-red-600 text-center font-bold">
              If public key not provided this diary cannot be accessed.
            </p>
          </DialogHeader>
          <Button
            type="submit"
            onClick={() => {
              console.log(key.length);
              if (key?.length !== 8) {
                toast({
                  title: "Key not valid.",
                  variant: "destructive",
                  duration: 9000,
                });
              } else {
                props.setKey(key);
                setIsopen(false);
              }
            }}
          >
            Save
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default KeyModal;
