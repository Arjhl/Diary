"use client";
import { useParams } from "next/navigation";
import KeyModal from "@/app/components/KeyModal";
import ReadonlyDiary from "@/app/components/ReadonlyDiary";
import { keyFormatter } from "@/app/utils/keyFormatter";
import { useState } from "react";
import { getDiaryData } from "@/app/utils/handleDiaryData";
import decrypt from "@/app/utils/decrypt";
import { useToast } from "@/app/components/ui/use-toast";

const PublicDiary = () => {
  const params = useParams();
  const [key, setKey] = useState("");
  const { toast } = useToast();
  const [blockData, setBlockData] = useState<any>([]);
  const [title, setTitle] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [diaryDate, setDiaryDate] = useState("");

  const onSetKey = async (localkey: string) => {
    setKey(localkey);

    try {
      const res = await getDiaryData(params.publicid.toString());
      console.log(res);
      if (!res.isPublic) throw new Error("Diary not Public");
      const data = decrypt(res.diary, keyFormatter(localkey));
      console.log(data);
      setBlockData(data);
      setDiaryDate(
        `${new Date(res.createdAt).getDate()}-${
          new Date(res.createdAt).getMonth() + 1
        }-${new Date(res.createdAt).getFullYear()}`
      );
      setTitle(res.title);
      if (data) setIsLoading(true);
    } catch (err) {
      toast({
        title: "Error Loading data",
        description:
          "This diary is not public or doesnt exist. Also check if the public key entered is correct.",
        variant: "destructive",
        duration: 7000,
      });
    }
  };

  return (
    <div className="m-2">
      {isLoading && (
        <ReadonlyDiary data={blockData} title={title} date={diaryDate} />
      )}
      <KeyModal setKey={onSetKey} isPublic={true} />
    </div>
  );
};

export default PublicDiary;
