//this component is used to make a diary public which also collects the key
import { useToast } from "@/app/components/ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/components/ui/dialog";
import { baseurl } from "../utils/constants";
import { useEffect, useRef, useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { DialogClose } from "@radix-ui/react-dialog";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";

type propTypes = {
  isPublic: boolean;
  setPublic: Function;
  makePrivate: Function;
};

const DiaryToggle = (props: propTypes) => {
  const [key, setkey] = useState("");
  const router = useRouter();
  const { toast } = useToast();
  const [isDiaryPublic, setIsDiaryPublic] = useState(props.isPublic);
  const params = useParams();

  useEffect(() => {
    if (props.isPublic) {
      setIsDiaryPublic(true);
    }
  }, [props]);

  const saveHandler = async () => {
    if (key?.length != 8) {
      toast({
        title: "Key Not Entered.",
        description: "Need to key to encrypt the public data.",
        variant: "destructive",
        duration: 9000,
      });
    }
    if (key.length == 8) {
      if (props.isPublic) {
        const res = await props.makePrivate(key);
        console.log(res);
        if (res) {
          setIsDiaryPublic(false);
          toast({
            title: "Woah!!,This Diary is now Private.",
          });
        }
      } else {
        const res = props.setPublic(key);
        setIsDiaryPublic(res);
        toast({
          title: "This Diary is now Public.",
          action: (
            <Button
              onClick={() => {
                router.push(`${baseurl}/public/${params.id}`);
              }}
              variant="outline"
            >
              Public Link
            </Button>
          ),
        });
      }
    }
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger>
          {!isDiaryPublic && (
            <Button variant="destructive" size={"sm"}>
              Make Public
            </Button>
          )}
          {isDiaryPublic && (
            <Button variant="default" size={"sm"}>
              Make Private
            </Button>
          )}
        </DialogTrigger>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>Enter Your Public Key</DialogTitle>
            <Input
              type="number"
              min={8}
              max={8}
              placeholder="Public Key"
              onChange={(e) => {
                setkey(e.target.value);
              }}
            />
            <DialogClose>
              <Button onClick={saveHandler}>Save</Button>
            </DialogClose>
            <DialogDescription>
              This is the Public key which is used to decrpyt data.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DiaryToggle;
