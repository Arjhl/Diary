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
  const [isLoading, setIsLoading] = useState(false);
  const ctx = useContext(UserContext);

  useEffect(() => {
    updateCtx();
  }, []);

  const updateCtx = async () => {
    const res = await props.data;
    setIsLoading(true);
    console.log(res);
    ctx.userData = res;
  };

  return (
    <UserContext.Provider value={ctx}>
      <CacheProvider>
        <ChakraProvider>{isLoading && props.children}</ChakraProvider>
      </CacheProvider>
    </UserContext.Provider>
  );
}
