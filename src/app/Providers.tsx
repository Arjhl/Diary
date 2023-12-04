// app/providers.tsx
"use client";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "./store/userContext";
import { Toaster } from "./components/ui/toaster";
import { ThemeProvider } from "./components/ThemeProvider";

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
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        {isLoading && props.children}
        <Toaster />
      </ThemeProvider>
    </UserContext.Provider>
  );
}
