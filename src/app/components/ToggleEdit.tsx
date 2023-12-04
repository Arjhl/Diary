"use client";
import { useState, useEffect } from "react";
import { Button } from "./ui/button";

type propTypes = {
  saveHandler: Function;
  setEdit: Function;
  edit: boolean;
};

const ToggleEdit = (props: propTypes) => {
  const [isEdit, setIsEdit] = useState(props.edit);
  console.log(isEdit);

  const editButtonClick = () => {
    setIsEdit(true);
    props.setEdit(true);
  };

  useEffect(() => {
    setIsEdit(props.edit);
  }, [props]);

  const saveButtonClick = async () => {
    setIsEdit(false);
    const result = await props.saveHandler();
    console.log(result);
    if (!result) {
      setIsEdit(true);
    }
    props.setEdit(!result);
  };

  return (
    <>
      {!isEdit && (
        <Button onClick={editButtonClick} variant="default" size={"sm"}>
          Edit
        </Button>
      )}
      {isEdit && (
        <Button onClick={saveButtonClick} variant="default" size={"sm"}>
          Save
        </Button>
      )}
    </>
  );
};

export default ToggleEdit;
