"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";

const Public = () => {
  const router = useRouter();
  const [diaryId, setDiaryId] = useState("");

  const submitHandler = () => {
    router.push(`/public/${diaryId}`);
  };

  return (
    <form
      onSubmit={submitHandler}
      className="flex flex-col gap-2 w-screen h-screen justify-center items-center"
    >
      <Input
        type="text"
        onChange={(e) => {
          setDiaryId(e.target.value);
        }}
        placeholder="Enter Public Key"
        className="w-52"
      />
      <Button size="sm" className="w-52 my-2" type="submit">
        Submit
      </Button>
    </form>
  );
};

export default Public;
