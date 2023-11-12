import CustomInput from "./CustomInput";
import { useState } from "react";
import { Heading } from "@chakra-ui/react";
import parse from "html-react-parser";

const Diary = () => {
  const [jsxString, setJsxString] = useState<string>("");

  const setString = (value: string) => {
    console.log(value);
    setJsxString(value);
  };

  return (
    <div className="mx-10">
      <div className="p-4">{parse(jsxString)}</div>
      <CustomInput addJsx={setString} />
    </div>
  );
};

export default Diary;
