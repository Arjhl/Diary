"use client";
import { Box, Button, Input, Popover, PopoverTrigger } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { ControlledMenu, MenuItem } from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/slide.css";
import TextareaAutosize from "react-textarea-autosize";
import { FaRegImage } from "react-icons/fa6";

type proptypes = {
  addJsx: Function;
  commandHandler: Function;
};

const defaultCommands = [
  "Heading",
  "Image",
  "Quote",
  "BulletList",
  "Link",
  "Divider",
  "Callout",
];

const CustomInput = (props: proptypes) => {
  const [textVal, setTextVal] = useState("");
  const [commands, setCommands] = useState(defaultCommands);

  const textValue = useRef<any>();
  const menuRef = useRef<any>();

  const checkCommand = (c: string) => {
    const filteredCommands = defaultCommands.filter((com) =>
      com.toLowerCase().includes(c)
    );
    console.log(filteredCommands);
    if (filteredCommands.length != 0) {
      // textValue.current.value = "";
      return c.toLowerCase();
    } else {
      return false;
    }
  };

  const onEnter = (e: any) => {
    if ((e.key == "Enter" && e.shiftKey == false) || e.key == "ArrowDown") {
      e.preventDefault();
      console.log("target", e.target.nextSibling);
      if (e.target.nextSibling != null) e.target.nextSibling.focus();
    } else if (e.key == "ArrowUp") {
      console.log("up", e.target.previousSibling);
      if (e.target.previousSibling != null) e.target.previousSibling.focus();
    }
    if ((textVal[0] == "/" && e.key == "ArrowDown") || e.key == "ArrowpUp") {
      menuRef.current.focus();
    }
    if (e.key == "Enter" && e.shiftKey == false) {
      e.preventDefault();
      const command = checkCommand(textVal.split("/")[1]);
      if (!command) props.commandHandler("Para");
      props.commandHandler(command);
    }
  };

  return (
    <>
      <TextareaAutosize
        className="w-full rounded-md p-4"
        placeholder="What's it about?"
        ref={textValue}
        onKeyDown={onEnter}
        onMouseUp={() => {
          console.log(window.getSelection()?.anchorOffset);
          const anchorNode = window.getSelection()?.anchorNode;
          const focusNode = window.getSelection()?.focusNode;
          console.log(window.getSelection());
          console.log(anchorNode, focusNode);
          // const position = anchorNode?.compareDocumentPosition(focusNode);
          // console.log(position);
        }}
        id="textarea"
        onChange={(e) => {
          const value = e.target.value;
          checkCommand(e.target.value.split("/")[1]);
          if (value[0] == "/") {
            const filteredCommands = defaultCommands.filter((c) =>
              c.toLowerCase().includes(value.split("/")[1])
            );
            setCommands(filteredCommands);
          }
          setTextVal(value);
        }}
      />

      {textVal[0] == "/" && commands.length != 0 && (
        <ControlledMenu
          // state={isMenuOpen ? "open" : "closed"}
          state="open"
          anchorRef={textValue}
          ref={menuRef}
          // onClose={() => setIsMenuOpen(false)}
          onKeyDown={(e) => {
            if (e.key != "ArrowDown") {
              if (e.key != "ArrowUp") {
                textValue.current.focus();
              }
            }
          }}
        >
          {commands.map((c) => (
            <MenuItem
              onClick={() => {
                textValue.current.value = "/" + c.toLowerCase();
              }}
            >
              {c}
            </MenuItem>
          ))}
        </ControlledMenu>
      )}
    </>
  );
};

export default CustomInput;
