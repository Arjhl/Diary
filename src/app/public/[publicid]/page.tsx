"use client";
import { useParams } from "next/navigation";
import KeyModal from "@/app/components/KeyModal";
import ReadonlyDiary from "@/app/components/ReadonlyDiary";
import { keyFormatter } from "@/app/utils/keyFormatter";
import { useState } from "react";
import { getDiaryData } from "@/app/utils/handleDiaryData";
import decrypt from "@/app/utils/decrypt";
import { useToast } from "@chakra-ui/react";

const PublicDiary = () => {
  const params = useParams();
  const [key, setKey] = useState("");
  const toast = useToast();
  const [blockData, setBlockData] = useState<any>([]);

  const onSetKey = async (localkey: string) => {
    setKey(localkey);

    try {
      const res = await getDiaryData(params.publicid.toString());
      console.log(res);
      if (!res.public || res.length == 0) throw new Error("Diary not Public");
      const data = decrypt(res.diary, keyFormatter(key));
      console.log(data);
      setBlockData(data);
    } catch (err) {
      toast({
        title: "Error Loading data",
        description:
          "This diary is not public or doesnt exist. Also check if the public key entered is correct.",
        status: "error",
        duration: 7000,
        isClosable: true,
      });
    }
  };
  console.log(params);
  return (
    <div>
      <ReadonlyDiary blockData={blockData} />
      <KeyModal setKey={onSetKey} isPublic={true} />
    </div>
  );
};

export default PublicDiary;
