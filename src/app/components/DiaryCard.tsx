import { Heading, Box } from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import { useRouter } from "next/navigation";

type Props = {
  title: String;
  id: string;
};

const DiaryCard = (props: Props) => {
  const router = useRouter();
  const clickHandler = () => {
    //call a function that routes to dashboard/props.id
    router.push(`/dashboard/${props.id}`);
  };
  return (
    <Box
      className=" bg-slate-400 px-5 py-3 my-3  rounded-md cursor-pointer flex justify-between"
      onClick={clickHandler}
    >
      <Heading size="sm">{props.title}</Heading>
      <DeleteIcon />
    </Box>
  );
};

export default DiaryCard;
