"use client";
import { useContext, useState } from "react";
import { UserContext } from "../store/userContext";
import logo from "../../../public/next.svg";
import { Image, Heading, Input, Circle } from "@chakra-ui/react";
import { EditIcon, CheckIcon } from "@chakra-ui/icons";

const DashboardHeader = () => {
  const ctx = useContext(UserContext);
  const [edit, setEdit] = useState(false);

  return (
    <div className="flex p-5 items-center gap-6 mx-10">
      <Image
        borderRadius="full"
        boxSize="50px"
        src="https://images.unsplash.com/photo-1553356084-58ef4a67b2a7?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="Dan Abramov"
      />
      <Heading contentEditable={edit} spellCheck="false">
        {ctx.userData.username === null
          ? ctx.userData.email.split("@")[0]
          : ctx.userData.username}
      </Heading>
      {!edit && (
        <EditIcon
          onClick={() => {
            setEdit(true);
          }}
        />
      )}
      {edit && (
        <CheckIcon
          onClick={() => {
            setEdit(false);
          }}
        />
      )}
      <Input />
    </div>
  );
};

export default DashboardHeader;
