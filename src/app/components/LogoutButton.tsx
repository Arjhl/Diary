import { useClerk } from "@clerk/clerk-react";
import { Button } from "./ui/button";
import { useRouter } from "next/router";

const LogoutButton = () => {
  const { signOut } = useClerk();
  const router = useRouter();

  const logout = () => {
    signOut();
    router.push("/");
  };

  return (
    <Button variant="secondary" onClick={logout}>
      Logout
    </Button>
  );
};

export default LogoutButton;
