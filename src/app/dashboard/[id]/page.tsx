"use client";
import Editor from "@/app/components/editor";
import ReadonlyDiary from "@/app/components/ReadonlyDiary";
import { getDiaryData, saveDiary } from "@/app/utils/handleDiaryData";
import { useParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import decrypt from "@/app/utils/decrypt";
import DashboardHeader from "@/app/components/DashboardHeader";
import KeyInput from "@/app/components/KeyInput";
import ToggleEdit from "@/app/components/ToggleEdit";
import DiaryToggle from "@/app/components/DiaryToggle";
import { UserContext } from "@/app/store/userContext";
import encrypt from "@/app/utils/encyrpt";
import { useRouter } from "next/navigation";
import KeyModal from "@/app/components/KeyModal";
import { keyFormatter } from "@/app/utils/keyFormatter";
import { useToast } from "@/app/components/ui/use-toast";

const TextEditor = () => {
  const [blockData, setBlockData] = useState<any>([]);
  const ctx = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [title, setTitle] = useState<string>("");
  const [key, setKey] = useState("");
  const [isPublic, setIsPublic] = useState(false);
  const params = useParams();
  console.log(params);
  const { toast } = useToast();
  const router = useRouter();
  const [diaryDate, setDiaryDate] = useState("");

  const getDiaryBlocks = async () => {
    // take the param id and get the diary data
    const res = await getDiaryData(params.id.toString());
    setDiaryDate(
      `${new Date(res?.createdAt).getDate()}-${
        new Date(res?.createdAt).getMonth() + 1
      }-${new Date(res?.createdAt).getFullYear()}`
    );
    if (res?.isPublic) {
      console.log("public diary");
      setIsPublic(true);
      setTitle(res.title);
      if (res.title.trim() == "") {
        setEditMode(true);
      }
      setBlockData([res.diary.toString()]);
      return;
    }
    if (!ctx.key && !res.isPublic) {
      toast({
        title: "Enter key.",
        description: "Enter the key to get the content.",
        variant: "destructive",
        duration: 9000,
      });
      return;
    }
    if (res == null || !res) {
      router.push("/dashboard");
    }
    try {
      setTitle(res.title);
      setIsPublic(res.isPublic);

      const block = decrypt(res?.diary, keyFormatter(ctx.key.toString()));
      console.log(block);
      setBlockData(block);
      setIsLoading(true);
      if (res.title.trim() == "") {
        setEditMode(true);
      }
    } catch (err) {
      alert("Provided Key is not correct" + err);
    }
  };

  useEffect(() => {
    getDiaryBlocks();
  }, []);

  const getTitle = (updatedTitle: string) => {
    setTitle(updatedTitle);
  };

  const setEdit = (isEdit: boolean) => {
    if (isEdit) {
      console.log("editmode true");
      setEditMode(true);
      return;
    } else {
      setEditMode(false);
    }
  };

  //this function is used to track the block data and then update it when the save button in toggle edit component is called
  const getBlockData = (block: any) => {
    setBlockData(block);
  };

  const saveDataToDb = async () => {
    // const newUuid = uuid();
    console.log(isPublic);
    if (title.trim() == "") {
      toast({
        title: "Title is compulsory.",
        variant: "destructive",
        duration: 9000,
      });
      return false;
    }

    if (ctx.key.length == 0 || ctx.key == undefined) {
      toast({
        title: "No KEY is specified.",
        description:
          "Enter the key and then save again to save your diary to the database.",
        variant: "destructive",
        duration: 9000,
      });
      return false;
    }

    const diaryEncrypted = encrypt(
      blockData,
      keyFormatter(isPublic ? key : ctx.key)
    );
    //send that to db
    saveDiary(
      diaryEncrypted,
      title,
      params.id.toString(),
      ctx.userData.id,
      isPublic
    );

    return true;
  };

  const makePublic = (key: string) => {
    //get the key , then when saved encrypt it using the key

    const encryptedData = encrypt(blockData, keyFormatter(key));
    if (encryptedData) setIsPublic(true);
    //save the encrypted data
    saveDiary(
      encryptedData,
      title,
      params.id.toString(),
      ctx.userData.id,
      true
    );
    return true;
  };

  const makePrivate = async (key: string) => {
    //decrypts the given blockdata using the public key , then encrypts using ctx.key then store it
    console.log("Making Private", key);
    if (ctx.key == "" || !ctx.key) {
      toast({
        title: "General Key / Account Key is required.",
        description: "Update the account key to make this diary private",
        variant: "destructive",
        duration: 9000,
      });
      return false;
    }

    const res = await getDiaryData(params.id.toString());
    // decrypt()
    const data = decrypt(res?.diary, keyFormatter(key));
    console.log("public->private data", data);
    //get ctx.kkey
    const encryptedData = encrypt(data, keyFormatter(ctx.key));
    console.log(ctx.key, encryptedData);
    if (encryptedData) {
      saveDiary(
        encryptedData,
        title,
        params.id.toString(),
        ctx.userData.id,
        false
      );
      setIsPublic(false);
      return true;
    }
  };

  const setPublicKey = async (key: string) => {
    setKey(key);
    const res = await getDiaryData(params.id.toString());
    setTitle(res.title);

    const block = decrypt(res?.diary, keyFormatter(key));
    console.log(block);
    setBlockData(block);
    setIsPublic(true);
    setIsLoading(true);
  };

  const keyChangeHandler = () => {
    if (isPublic) return;
    getDiaryBlocks();
  };

  return (
    <div className="mx-2 my-2 sm:m-10">
      <DashboardHeader />
      <div className="flex p-4 flex-col justify-center h-auto sm:flex-row items-center sm:justify-between  bg-primary-foreground sm:px-3 sm:py-0 rounded-md ">
        <KeyInput onKeyChange={keyChangeHandler} />
        {isLoading && (
          <div className="flex gap-2 items-center justify-center sm:gap-5 ">
            <ToggleEdit
              saveHandler={saveDataToDb}
              setEdit={setEdit}
              edit={editMode}
            />

            <DiaryToggle
              isPublic={isPublic}
              setPublic={makePublic}
              makePrivate={makePrivate}
            />
          </div>
        )}
      </div>
      {isLoading && editMode && (
        <>
          <Editor
            blockData={blockData}
            title={title}
            getBlockData={getBlockData}
            getTitle={getTitle}
            editable={true}
            date={diaryDate}
          />
        </>
      )}
      {!editMode && isLoading && (
        <>
          <Editor
            blockData={blockData}
            title={title}
            getBlockData={getBlockData}
            getTitle={getTitle}
            editable={false}
            date={diaryDate}
          />
        </>
      )}
      {isPublic && key.length == 0 && (
        <KeyModal setKey={setPublicKey} isPublic={isPublic} />
      )}
    </div>
  );
};

export default TextEditor;
