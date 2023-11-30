"use client";
import Editor from "@/app/components/editor";
import ReadonlyDiary from "@/app/components/ReadonlyDiary";
import { getDiaryData } from "@/app/utils/handleDiaryData";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import decrypt from "@/app/utils/decrypt";
import DashboardHeader from "@/app/components/DashboardHeader";

const TextEditor = () => {
  const [blockData, setBlockData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const params = useParams();
  const [diaryTitle, setDiaryTitle] = useState("");
  console.log(params);

  const getDiaryBlocks = async () => {
    // take the param id and get the diary data
    const res = await getDiaryData(params.id.toString());
    console.log(res);
    setDiaryTitle(res.title);
    const block = decrypt(
      res?.diary,
      [9, 4, 4, 8, 0, 6, 7, 1, 9, 4, 4, 8, 0, 6, 7, 1]
    );
    console.log(block);
    setBlockData(block);
    setIsLoading(true);
  };

  const setEdit = () => {};

  useEffect(() => {
    getDiaryBlocks();
  }, []);

  //this function is used to track the block data and then update it when the save button in toggle edit component is called
  const getBlockData = () => {};

  return (
    <div>
      <DashboardHeader />
      {isLoading && (
        <Editor
          blockData={blockData}
          title={diaryTitle}
          id={params.id.toString()}
        />
      )}
      ;
    </div>
  );
};

export default TextEditor;
