import CustomInput from "./CustomInput";
import { useState } from "react";
import { Heading } from "@chakra-ui/react";
import parse from "html-react-parser";
import "../styles/diary.css";

function isValidURL(S: String) {
  var res = S.match(
    /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
  );
  return res !== null;
}

const headingClass = `bg-red-300`;

const Diary = () => {
  const transferFocus = (e: any) => {
    if ((e.key == "Enter" && e.shiftKey == false) || e.key == "ArrowDown") {
      e.preventDefault();
      console.log("target", e.target.nextSibling);
      e.target.nextSibling.focus();
    } else if (e.key == "ArrowUp") {
      console.log("up", e.target.previousSibling);
      e.target.previousSibling.focus();
    }
  };

  const [elementArry, setElementArray] = useState<any[]>([
    <Heading contentEditable noOfLines={1} onKeyDown={transferFocus}>
      Add Heading
    </Heading>,
  ]);

  const pushElementArray = (value: string) => {
    console.log("idk");
  };

  const commandHandler = (command: string) => {
    console.log(command);
    if (command == "heading") {
      const heading = (
        <Heading contentEditable noOfLines={1} onKeyDown={transferFocus}>
          Heading
        </Heading>
      );
      setElementArray([...elementArry, heading]);
    }
  };

  return (
    <div
      className="mx-10"
      onMouseUp={() => {
        console.log(window.getSelection());
      }}
    >
      {elementArry.map((ele) => {
        return ele;
      })}
      <CustomInput addJsx={pushElementArray} commandHandler={commandHandler} />
    </div>
  );
};

export default Diary;
