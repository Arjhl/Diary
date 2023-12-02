"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Public = () => {
  const router = useRouter();
  const [diaryId, setDiaryId] = useState("");

  const submitHandler = () => {
    router.push(`/public/${diaryId}`);
  };

  return (
    <form onSubmit={submitHandler}>
      <input
        type="text"
        onChange={(e) => {
          setDiaryId(e.target.value);
        }}
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default Public;
