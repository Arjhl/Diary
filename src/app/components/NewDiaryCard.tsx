import { Heading, Box } from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import { v4 as uuid } from "uuid";
import { saveDiary } from "../utils/handleDiaryData";
import { useContext } from "react";
import { UserContext } from "../store/userContext";
import { useRouter } from "next/navigation";
import encrypt from "../utils/encyrpt";
import { keyFormatter } from "../utils/keyFormatter";
import { useToast } from "@chakra-ui/react";

const emptyDiaryData = [
  {
    id: "b0fd3b53-de1b-46fb-989b-64e3544f6706",
    type: "heading",
    props: {
      textColor: "default",
      backgroundColor: "default",
      textAlignment: "left",
      level: 1,
    },
    content: [],
    children: [],
  },
  {
    id: "29e59aca-905f-43c8-9d60-9d4990fcfd98",
    type: "paragraph",
    props: {
      textColor: "default",
      backgroundColor: "default",
      textAlignment: "left",
    },
    content: [],
    children: [],
  },
  {
    id: "91f5f0fe-6518-4567-93af-0ddfb923590e",
    type: "paragraph",
    props: {
      textColor: "default",
      backgroundColor: "default",
      textAlignment: "left",
    },
    content: [],
    children: [],
  },
];

const NewDiaryCard = () => {
  const toast = useToast();
  const ctx = useContext(UserContext);
  const router = useRouter();
  const generateNewDiary = () => {
    //generate new id using uuid , then navigate to dashboard/new which will handle the new request
    const newUuid = uuid();
    console.log("new diary is creating");
    if (ctx.key.trim() == "") {
      toast({
        title: "Enter key.",
        description: "Enter the key to generate a new Diary",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      return;
    }
    const encryptedData = encrypt(emptyDiaryData, keyFormatter(ctx.key));
    saveDiary(encryptedData, "", newUuid, ctx.userData.id, false);
    router.push(`/dashboard/${newUuid}`);
  };

  return (
    <Box
      className=" text-center bg-slate-400 px-5 py-3 my-3  rounded-md cursor-pointer flex justify-between"
      onClick={generateNewDiary}
    >
      <Heading size="sm" className="text-center w-full">
        {"+"}
      </Heading>
      <DeleteIcon />
    </Box>
  );
};

export default NewDiaryCard;
