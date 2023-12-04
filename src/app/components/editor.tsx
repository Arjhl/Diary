// this registers <Editor> as a Client Component
"use client";
import "../styles/editor.css";
import { BlockNoteEditor } from "@blocknote/core";
import {
  BlockNoteView,
  darkDefaultTheme,
  Theme,
  useBlockNote,
  lightDefaultTheme,
} from "@blocknote/react";
import "@blocknote/core/style.css";

import "@blocknote/core/style.css";
import { useUploadThing } from "../utils/uploadThing";
import { useLeavePageConfirm } from "../store/useLeavePageConfirm";
import { Input } from "./ui/input";
import { useToast } from "./ui/use-toast";
import { useTheme } from "next-themes";

// Our <Editor> component we can reuse later

type propTypes = {
  blockData: any;
  title: string;
  getBlockData: Function;
  getTitle: Function;
  editable: boolean;
  date: string;
};

//blocknote editor theme

const componentStyles = (theme: Theme) => ({
  Editor: {
    '[data-node-type="blockContainer"] *': {
      FontFace: "custom",
    },
  },
});

// Default dark theme with additional component styles.
const BlockTheme = {
  light: {
    ...lightDefaultTheme,
    componentStyles,
  },
  dark: {
    ...darkDefaultTheme,
    componentStyles,
  },
} satisfies {
  light: Theme;
  dark: Theme;
};

export default function Editor(props: propTypes) {
  const { toast } = useToast();
  const theme = useTheme();
  console.log("Theme", theme.theme);

  useLeavePageConfirm(true);

  const { startUpload, permittedFileInfo } = useUploadThing("imageUploader", {
    onClientUploadComplete: (res) => {
      console.log(res);
    },
    onUploadError: () => {
      toast({
        title: "Image upload failed",
        description: "Check if the file is below 4MB.",
        variant: "destructive",
        duration: 9000,
      });
    },
  });

  async function uploadFiles(file: File) {
    const res = await startUpload([file]);
    console.log("REs from uploadfiles", res);
    return res ? res[0].url : "";
  }

  // Creates a new editor instance.

  const editor: BlockNoteEditor = useBlockNote({
    uploadFile: uploadFiles,
    initialContent: props.blockData,
    editable: props.editable,
    domAttributes: {
      // Adds a class to all `blockContainer` elements.
      blockContainer: {
        class: "block-container",
      },
      editor: {
        class: "editorClass",
      },
    },
  });

  editor.onEditorContentChange(() => {
    const blocks = editor.topLevelBlocks;
    console.log("Content was changed:", blocks);
    props.getBlockData(blocks);
  });

  //make a new component for title
  return (
    <div className="sm:text-xs">
      {!props.editable && (
        <div className="flex justify-between">
          <p className=" font-normal text-sm my-2 text-muted-foreground sm:text-lg">
            {props.title}
          </p>
          <p className=" font-normal text-sm my-2 text-muted-foreground sm:text-lg">
            {props.date}
          </p>
        </div>
      )}
      {props.editable && (
        <Input
          onChange={(e: any) => {
            props.getTitle(e.target.value);
          }}
          placeholder={props.title ? props.title : "Enter title"}
          contentEditable
          className=" font-normal text-xs sm:text-sm my-2 animate-in w-32"
        />
      )}
      <BlockNoteView
        editor={editor}
        theme={theme.theme == "dark" ? BlockTheme.dark : BlockTheme.light}
      />
    </div>
  );
}
