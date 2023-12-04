import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { useRouter } from "next/navigation";
import { deleteDiary } from "../utils/handleDiaryData";
import { Trash2 } from "lucide-react";

type Props = {
  title: String;
  id: string;
  date: string;
  refreshState: Function;
};

const DiaryCard = (props: Props) => {
  const router = useRouter();
  const diaryTime = `${new Date(props.date).getDate()}-${
    new Date(props.date).getMonth() + 1
  }-${new Date(props.date).getFullYear()}`;
  console.log(diaryTime);
  const clickHandler = () => {
    //call a function that routes to dashboard/props.id
    router.push(`/dashboard/${props.id}`);
  };

  const deleteHandler = async () => {
    // const res = confirm();
    // console.log(res);

    //delete diary with id props.id
    const res = await deleteDiary(props.id);
    console.log(res);
    if (res) {
      props.refreshState();
    }
  };

  return (
    <Card className="flex border-0 my-2 gap-2">
      <Button onClick={clickHandler} className="w-screen" variant="secondary">
        {props.title ? props.title : `Diary on ${diaryTime}`}
      </Button>
      <Button variant="destructive">
        <Trash2 onClick={deleteHandler} className="text-foreground" />
      </Button>
    </Card>
  );
};

export default DiaryCard;
