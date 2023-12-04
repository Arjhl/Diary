import Editor from "./editor";

type propTypes = {
  data: any;
  title: string;
  date: string;
};

const ReadonlyDiary = (props: propTypes) => {
  console.log("READ ONLY DIARY", props.data);

  return (
    <div className="w-full h-screen">
      <Editor
        blockData={props.data}
        title={props.title}
        editable={false}
        getBlockData={() => {}}
        getTitle={() => {}}
        date={props.date}
      />
    </div>
  );
};

export default ReadonlyDiary;
