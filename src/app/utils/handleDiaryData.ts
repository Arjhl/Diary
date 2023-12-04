//save  , getDiaryList and getContent(of a diary)
import { baseurl } from "./constants";

export const saveDiary = async (
  data: string,
  title: string,
  id: string,
  userid: string,
  isPublic: boolean
) => {
  const resObj = {
    id: id,
    userid: userid,
    diary: data,
    title: title,
    isPublic: isPublic,
  };

  console.log(resObj);
  const response = await fetch(`${baseurl}/api/diaries`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(resObj),
  });
  const d = await response.json();
  return d;
};

export const update = async (
  id: string,
  data: string,
  title: string,
  userid: string
) => {
  const response = await fetch(`${baseurl}/api/diaries`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: id,
      userid: userid,
      diary: data,
      title: title,
    }),
  });
  const d = await response.json();
  return d;
};

export const getAllDiaryList = async (userid: string) => {
  const response = await fetch(`${baseurl}/api/diaries`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      list: true,
      userid: userid,
    }),
  });
  const d = await response.json();
  return d;
};

export const getDiaryData = async (diaryId: string) => {
  const response = await fetch(`${baseurl}/api/diaries?id=${diaryId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const d = await response.json();
  return d;
};

export const deleteDiary = async (id: string) => {
  const response = await fetch(`${baseurl}/api/diaries?id=${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id,
    }),
  });
  const d = await response.json();
  console.log(d);
  return d;
};
