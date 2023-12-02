// this registers <Editor> as a Client Component
"use client";
import { BlockNoteEditor } from "@blocknote/core";
import { BlockNoteView, useBlockNote } from "@blocknote/react";
import "@blocknote/core/style.css";
import DashboardHeader from "../components/DashboardHeader";
import { useRouter } from "next/navigation";
import { useState, useContext, useRef } from "react";
import { UserContext } from "../store/userContext";
import { useUploadThing } from "../utils/uploadThing";
import { useLeavePageConfirm } from "../store/useLeavePageConfirm";
import { Button, useToast, Input } from "@chakra-ui/react";
import { v4 as uuid } from "uuid";
const aesjs = require("aes-js");
import encrypt from "../utils/encyrpt";
import decrypt from "../utils/decrypt";
import { saveDiary } from "../utils/handleDiaryData";
import KeyInput from "./KeyInput";

// Our <Editor> component we can reuse later

type propTypes = {
  blockData: any;
  title: string;
  id: string;
  getBlockData: Function;
  getTitle: Function;
};

export default function Editor(props: propTypes) {
  const toast = useToast();

  useLeavePageConfirm(false);

  const { startUpload, permittedFileInfo } = useUploadThing("imageUploader", {
    onClientUploadComplete: (res) => {
      console.log(res);
    },
    onUploadError: () => {
      toast({
        title: "Image upload failed",
        description: "Check if the file is below 4MB.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    },
  });

  async function uploadFiles(file: File) {
    const res = await startUpload([file]);
    console.log("REs from uploadfiles", res);
    return res ? res[0].url : "";
  }

  // Creates a new editor instance.

  const editor: BlockNoteEditor | null = useBlockNote({
    uploadFile: uploadFiles,
    initialContent: props.blockData,
  });

  editor.onEditorContentChange(() => {
    const blocks = editor.topLevelBlocks;
    console.log("Content was changed:", blocks);
    props.getBlockData(blocks);
  });

  //make a new component for title
  return (
    <div>
      <p>{props.title}</p>
      <Input
        onChange={(e) => {
          props.getTitle(e.target.value);
        }}
        placeholder="Enter title : this content will not be encrypted"
        contentEditable
      />
      <BlockNoteView className=" bg-white" editor={editor} theme={"light"} />
    </div>
  );
}
