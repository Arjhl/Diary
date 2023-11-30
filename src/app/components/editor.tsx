// this registers <Editor> as a Client Component
"use client";
import { BlockNoteEditor, PartialBlock } from "@blocknote/core";
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
};

export default function Editor(props: propTypes) {
  const [savedBlocks, setSavedBlocks] = useState<any>([]);
  const [blockData, setBlockData] = useState(props.blockData);
  const [diaryTitle, setDiaryTitle] = useState(props.title);
  const toast = useToast();
  const titleRef = useRef<any>();
  const ctx = useContext(UserContext);
  useLeavePageConfirm(false);
  const router = useRouter();

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
    initialContent: blockData,
  });

  editor.onEditorContentChange(() => {
    const blocks = editor.topLevelBlocks;
    console.log("Content was changed:", blocks);
    setSavedBlocks(blocks);
  });

  // Renders the editor instance using a React component.

  const saveHandler = async () => {
    const newUuid = uuid();

    if (ctx.key == "" || ctx.key == undefined) {
      toast({
        title: "No KEY is specified.",
        description:
          "Enter the key and then save again to save your diary to the database.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      return;
    }
    const diaryEncrypted = encrypt(savedBlocks, ctx.key);
    //send that to db
    //add a title component
    // title =  titleRef.current.value
    // saveDiary(diaryEncrypted);
    saveDiary(
      diaryEncrypted,
      titleRef?.current?.value,
      props.id,
      ctx.userData.id
    );
  };

  return (
    <div>
      <KeyInput />
      <p
        placeholder="Enter title : this content will not be encrypted"
        ref={titleRef}
        contentEditable
      >
        {diaryTitle}
      </p>
      <BlockNoteView className=" bg-white" editor={editor} theme={"light"} />
      <Button onClick={saveHandler}>Submit</Button>
    </div>
  );
}
