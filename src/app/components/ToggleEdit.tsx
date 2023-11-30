"use client";
import { Button } from "@chakra-ui/react";
import { useState } from "react";

type propTypes = {
  saveHandler: Function;
};

const ToggleEdit = () => {
  const [isEdit, setIsEdit] = useState(false);

  return (
    <>
      {!isEdit && <Button>Edit</Button>};{isEdit && <Button>Save</Button>}
    </>
  );
};

export default ToggleEdit;
