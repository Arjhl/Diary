"use client";
import { currentUser } from "@clerk/nextjs";
import { Button } from "@chakra-ui/react";

import { useState } from "react";
import DashboardHeader from "../components/DashboardHeader";
import DiaryCard from "../components/DiaryCard";
import { SimpleGrid } from "@chakra-ui/react";
import NewDiary from "../components/NewDiary";
import Diary from "../components/Diary";
import ImageUploadButton from "../components/UploadButton";

const titles = [
  "WHy night is So young",
  "Bruhhhhhhh -_-",
  "i dont care how many lies i hear",
  "my heart still wants u",
];

const DashBoard = () => {
  const [showDiary, setShowDiary] = useState(false);

  return (
    <div>
      <DashboardHeader />
      {!showDiary && (
        <SimpleGrid columns={1} spacing={0} className="mx-10">
          <div
            onClick={() => {
              setShowDiary(true);
            }}
          >
            <NewDiary />
          </div>
          {titles.map((t, i) => {
            return <DiaryCard key={i} title={t.toString()} />;
          })}
        </SimpleGrid>
      )}
      {showDiary && <Diary />}
    </div>
  );
};

export default DashBoard;
