"use client";
import { useContext, useState } from "react";
import { UserContext } from "../store/userContext";
import { Input } from "./ui/input";
import { Check, Edit } from "lucide-react";
import { ModeToggle } from "./ToggleTheme";
import { Pencil } from "lucide-react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/app/components/ui/avatar";

const DashboardHeader = () => {
  const ctx = useContext(UserContext);
  const [edit, setEdit] = useState(false);
  const [username, setUsername] = useState(ctx.userData.username);

  const usernameChangeHandler = async () => {
    console.log(username);
    const reqBody = {
      email: ctx.userData.email,
      id: ctx.userData.id,
      username,
    };

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/user`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reqBody),
      }
    );
    const data = await response.json();
    console.log(data);
  };

  return (
    <div className="flex p-3 items-center justify-between border-secondary my-4 rounded-md  border-2 border-solid">
      <Avatar>
        <AvatarImage
          src="https://utfs.io/f/7712b204-971e-4948-9c1e-3eb09fc645d3-b5u5r5.png"
          className="object-cover"
        />
        <AvatarFallback>Logo</AvatarFallback>
      </Avatar>
      <div className="flex items-center gap-1">
        {!edit && (
          <h6 spellCheck="false" className=" text-2xl font-bold ">
            {username.length == 0 ? "Add Username" : username}
          </h6>
        )}
        {edit && (
          <Input
            placeholder={ctx.userData.username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
        )}
        {!edit && (
          <Pencil
            className="h-3 cursor-pointer"
            onClick={() => {
              setEdit(true);
            }}
          />
        )}
        {edit && (
          <Check
            onClick={() => {
              setEdit(false);
              usernameChangeHandler();
            }}
          />
        )}
      </div>
      <div className=" self-end">
        <ModeToggle />
      </div>
    </div>
  );
};

export default DashboardHeader;
