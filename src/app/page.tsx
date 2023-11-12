"use client";
import { SignInButton, SignUpButton } from "@clerk/nextjs";
import { Button } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { UserContext } from "./store/userContext";
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";

export default function Home() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const { isLoaded, userId } = useAuth();
  const ctx = useContext(UserContext);
  const router = useRouter();

  useEffect(() => {
    console.log(ctx);
    if (userId) {
      setIsSignedIn(true);
    }
  }, []);

  const redirectToDashboard = () => {
    router.push("/dashboard");
  };

  return (
    isLoaded && (
      <div className="flex flex-col gap-6 justify-center items-center h-screen">
        <h1>Personal Diary , with no security concerns.</h1>
        {!isSignedIn && (
          <div className="flex gap-5">
            <SignInButton>
              <Button>SignIn</Button>
            </SignInButton>
            <SignUpButton>
              <Button>SignUp</Button>
            </SignUpButton>
          </div>
        )}
        {isSignedIn && (
          <Button onClick={redirectToDashboard}>Get Started</Button>
        )}
      </div>
    )
  );
}
