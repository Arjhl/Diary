import { Box, Heading } from "@chakra-ui/react";

const NewDiary = () => {
  return (
    <Box className=" bg-slate-400 p-2 m-2  rounded-md cursor-pointer">
      <Heading size="sm" className="text-center">
        +
      </Heading>
    </Box>
  );
};

export default NewDiary;
