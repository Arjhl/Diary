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
import { useToast } from "@chakra-ui/react";
import encrypt from "@/app/utils/encyrpt";
import { useRouter } from "next/navigation";
import KeyModal from "@/app/components/KeyModal";
import { keyFormatter } from "@/app/utils/keyFormatter";

const TextEditor = () => {
  const [blockData, setBlockData] = useState([]);
  const ctx = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [title, setTitle] = useState<string>("");
  const [key, setKey] = useState("");
  const [isPublic, setIsPublic] = useState(false);
  const params = useParams();
  console.log(params);
  const toast = useToast();
  const router = useRouter();

  const getDiaryBlocks = async () => {
    // take the param id and get the diary data
    const res = await getDiaryData(params.id.toString());
    if (res.isPublic) {
      console.log("public diary");
      setIsPublic(true);
      setTitle(res.title);
      if (res.diary.trim() == "") {
        setEditMode(true);
      }
      return;
    }
    if (!ctx.key && !res.isPublic) {
      toast({
        title: "Enter key.",
        description: "Enter the key to get the content.",
        status: "error",
        duration: 9000,
        isClosable: true,
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
      if (res.diary.trim() == "") {
        setEditMode(true);
      }
    } catch (err) {
      alert("Provided Key Might is not correct" + err);
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

    if (!isPublic) {
      if (ctx.key.length == 0 || ctx.key == undefined) {
        toast({
          title: "No KEY is specified.",
          description:
            "Enter the key and then save again to save your diary to the database.",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
        return false;
      }
    }
    console.log(isPublic, key, ctx.key);

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
      false
    );
    return true;
  };

  const makePublic = (key: string) => {
    //get the key , then when saved encrypt it using the key

    const encryptedData = encrypt(blockData, keyFormatter(key));
    console.log(encryptedData);
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
    if (ctx.key == "") {
      toast({
        title: "General Key / Account Key is required.",
        description: "Update the account key to make this diary private",
        status: "error",
        duration: 9000,
        isClosable: true,
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
    saveDiary(
      encryptedData,
      title,
      params.id.toString(),
      ctx.userData.id,
      false
    );
    setIsPublic(false);
    return true;
  };

  const setPublicKey = async (key: string) => {
    console.log("Setting key", key);
    setKey(key);
    const res = await getDiaryData(params.id.toString());
    setTitle(res.title);
    setIsPublic(res.isPublic);
    const block = decrypt(res?.diary, keyFormatter(key));
    console.log(block);
    setBlockData(block);
    setIsLoading(true);
  };

  const keyChangeHandler = () => {
    if (isPublic) return;
    getDiaryBlocks();
  };

  return (
    <div>
      <DashboardHeader />
      <KeyInput onKeyChange={keyChangeHandler} />
      {isLoading && (
        <div className="flex">
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
      {isLoading && editMode && (
        <>
          <Editor
            blockData={blockData}
            title={title}
            id={params.id.toString()}
            getBlockData={getBlockData}
            getTitle={getTitle}
          />
        </>
      )}
      {!editMode && isLoading && (
        <>
          <ReadonlyDiary blockData={blockData} />
        </>
      )}
      {isPublic && <KeyModal setKey={setPublicKey} isPublic={isPublic} />}
    </div>
  );
};

export default TextEditor;
