type propTypes = {
  blockData: any;
};

const ReadonlyDiary = (props: propTypes) => {
  console.log("READ ONLY DIARY", props.blockData);
  return <h1>Read only Diary</h1>;
};

export default ReadonlyDiary;
