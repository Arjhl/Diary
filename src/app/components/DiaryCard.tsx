import { Heading, Box } from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";

type Props = {
  title: String;
};

const DiaryCard = (props: Props) => {
  return (
    <Box className=" bg-slate-400 px-5 py-3 m-2  rounded-md cursor-pointer flex justify-between">
      <Heading size="sm">{props.title}</Heading>
      <DeleteIcon />
    </Box>
  );
};

export default DiaryCard;
