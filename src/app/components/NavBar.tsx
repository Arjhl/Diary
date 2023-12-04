import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/app/components/ui/avatar";
import { ModeToggle } from "./ToggleTheme";
import { Button } from "./ui/button";
import { useAuth, useClerk } from "@clerk/clerk-react";

type propTypes = {
  setIsSignedIn: Function;
};

const NavBar = (props: propTypes) => {
  const { signOut } = useClerk();
  const { isLoaded, userId } = useAuth();
  const logoutHandler = () => {
    signOut();
    props.setIsSignedIn(false);
  };

  return (
    <div className="fixed flex justify-between w-screen px-10 py-5 items-center">
      <Avatar>
        <AvatarImage src="https://utfs.io/f/7712b204-971e-4948-9c1e-3eb09fc645d3-b5u5r5.png" />
        <AvatarFallback>CipherJounralLogo</AvatarFallback>
      </Avatar>
      <div className="flex gap-5">
        {userId && (
          <Button variant="secondary" onClick={logoutHandler}>
            Logout
          </Button>
        )}
        <ModeToggle />
      </div>
    </div>
  );
};

export default NavBar;
