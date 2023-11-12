// app/providers.tsx
"use client";

import { CacheProvider } from "@chakra-ui/next-js";
import { ChakraProvider } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "./store/userContext";

type propTypes = {
  children: React.ReactNode;
  data: any;
};

export function Providers(props: propTypes) {
  const ctx = useContext(UserContext);
  const [userData, setUserData] = useState({
    id: "",
    email: "",
    username: "",
  });

  useEffect(() => {
    printData();
  });

  const printData = async () => {
    const res = await props.data;
    console.log(res);

    ctx.userData = res;
    setUserData(res);
  };

  return (
    <UserContext.Provider value={{ key: "", userData }}>
      <CacheProvider>
        <ChakraProvider>{props.children}</ChakraProvider>
      </CacheProvider>
    </UserContext.Provider>
  );
}
