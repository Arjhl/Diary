import { Box, Textarea, Button } from "@chakra-ui/react";
import { AttachmentIcon, LinkIcon } from "@chakra-ui/icons";
import TextareaAutosize from "react-textarea-autosize";
import { useRef } from "react";

type proptypes = {
  addJsx: Function;
};

const CustomInput = (props: proptypes) => {
  const textValue = useRef<any>();
  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(textValue.current.value);
    props.addJsx(`<p>${textValue.current.value}</p>`);
    textValue.current.value = "";
  };
  return (
    <Box className="h-auto">
      <form onSubmit={submitHandler}>
        <TextareaAutosize
          className="w-full rounded-md p-4"
          minRows={5}
          placeholder="What's it about?"
          ref={textValue}
          onChange={(e) => {
            if (
              e.target.value?.split("")[0] == "#" &&
              e.target.value?.split("")[e.target.value.length - 1] == "\n"
            ) {
              console.log("Header", e.target.value);
              props.addJsx(`<h1>${e.target.value}</h1>`);
              e.target.value = "";
            }
          }}
        />
        <Button type="submit" className="w-full">
          {" "}
          +{" "}
        </Button>
      </form>
    </Box>
  );
};

export default CustomInput;
