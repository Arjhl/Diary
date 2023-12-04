"use client";
import { useContext } from "react";
import { useEffect, useState } from "react";
import DashboardHeader from "../components/DashboardHeader";
import DiaryCard from "../components/DiaryCard";
import Diary from "../components/Diary";
import NewDiaryCard from "../components/NewDiaryCard";
import { getAllDiaryList } from "@/app/utils/handleDiaryData";
import { UserContext } from "../store/userContext";
import KeyInput from "../components/KeyInput";

const DashBoard = () => {
  const [showDiary, setShowDiary] = useState(false);
  const [diaryList, setDiaryList] = useState<
    {
      id: string;
      title: string;
      createdAt: string;
    }[]
  >([]);
  const ctx = useContext(UserContext);
  const getDiaryList = async () => {
    //get only title and id of each diary
    if (!ctx.userData) return;
    console.log(ctx);
    const res = await getAllDiaryList(ctx.userData.id);
    setDiaryList(res);
  };

  useEffect(() => {
    getDiaryList();
  }, []);

  const refreshState = () => {
    getDiaryList();
  };

  return (
    <div className="sm:mx-10 mx-2">
      <DashboardHeader />
      <KeyInput />
      {!showDiary && (
        <div>
          <div
            onClick={() => {
              setShowDiary(true);
            }}
          ></div>
          <NewDiaryCard />
          {diaryList?.map((t, i) => {
            //send id and title both
            console.log(t);
            return (
              <DiaryCard
                key={t.id}
                title={t.title}
                id={t.id}
                date={t.createdAt}
                refreshState={refreshState}
              />
            );
          })}
        </div>
      )}
      {showDiary && <Diary />}
    </div>
  );
};

export default DashBoard;
