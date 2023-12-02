import { Heading, Box, Button } from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import { useRouter } from "next/navigation";

type Props = {
  title: String;
  id: string;
  date: string;
};

const DiaryCard = (props: Props) => {
  const router = useRouter();
  const clickHandler = () => {
    //call a function that routes to dashboard/props.id
    router.push(`/dashboard/${props.id}`);
  };

  const deleteHandler = () => {
    const res = confirm();
    console.log(res);

    if (res) {
      //delete diary with id props.id
    }
  };

  return (
    <Box className=" bg-slate-400 px-5 py-3 my-3  rounded-md cursor-pointer flex justify-between">
      <Heading size="sm" onClick={clickHandler}>
        {props.title + props.date}
      </Heading>
      <Button>
        <DeleteIcon onClick={deleteHandler} />
      </Button>
    </Box>
  );
};

export default DiaryCard;
