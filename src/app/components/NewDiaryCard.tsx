import { Heading, Box } from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import { v4 as uuid } from "uuid";

const NewDiaryCard = () => {
  const generateNewDiary = () => {
    //generate new id using uuid , then navigate to dashboard/new which will handle the new request
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
